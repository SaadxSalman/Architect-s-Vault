import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { initTRPC, TRPCError } from '@trpc/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// --- 1. Initialize Clients ---
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- 2. Tools & Utilities ---

// Simple In-Memory Cache to save on OpenAI API costs
const embeddingCache: Record<string, number[]> = {};

/**
 * Enhanced Embedding Helper:
 * Includes caching, logging, and error handling for OpenAI.
 */
async function getVector(text: string): Promise<number[]> {
  const cleanText = text.toLowerCase().trim();
  
  // Check cache first
  if (embeddingCache[cleanText]) {
    console.log(`[CACHE HIT] Using existing embedding for: "${cleanText}"`);
    return embeddingCache[cleanText];
  }

  try {
    console.log(`[AI LOG] Generating embedding for: "${cleanText}"`);
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: cleanText,
    });

    const vector = response.data[0].embedding;
    embeddingCache[cleanText] = vector; // Save to cache
    return vector;
  } catch (error: any) {
    if (error.status === 429) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'AI Rate limit exceeded. Please wait.',
      });
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to generate embedding',
    });
  }
}

/**
 * Security Middleware: Validates Internal API Key
 */
const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// --- 3. tRPC Initialization ---
const t = initTRPC.create();

const appRouter = t.router({
  // --- HEALTH & MAINTENANCE ---
  
  healthCheck: t.procedure.query(async () => {
    const { data, error } = await supabase.from('products').select('id', { count: 'exact', head: true });
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return { status: 'ok', database: 'connected', totalProducts: data };
  }),

  getProducts: t.procedure.query(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  // Sync Script: Finds products missing embeddings and populates them
  syncProducts: t.procedure.mutation(async () => {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description')
      .is('embedding', null);

    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    if (!products || products.length === 0) return { message: "All products synced." };

    const updates = await Promise.all(
      products.map(async (product) => {
        const textToEmbed = `${product.name}: ${product.description}`;
        const embedding = await getVector(textToEmbed);
        
        return supabase
          .from('products')
          .update({ embedding })
          .eq('id', product.id);
      })
    );

    return { message: `Synced ${updates.length} products.` };
  }),

  // --- AI FEATURES ---

  // SEMANTIC SEARCH: Uses pgvector via Supabase RPC
  search: t.procedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const queryVector = await getVector(input.query);

      const { data, error } = await supabase.rpc('match_products', {
        query_embedding: queryVector,
        match_threshold: 0.5, 
        match_count: 5,
      });

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      return data;
    }),

  // CONTEXTUAL RECOMMENDER: Finds similar items and explains why
  recommend: t.procedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      // 1. Get the source product
      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', input.productId)
        .single();

      if (!product) throw new TRPCError({ code: 'NOT_FOUND' });
      if (!product.embedding) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Product missing embedding' });

      // 2. Find similar products using the existing vector
      const { data: neighbors } = await supabase.rpc('match_products', {
        query_embedding: product.embedding,
        match_threshold: 0.3,
        match_count: 2,
      });

      // Filter out the current product from recommendations
      const recommendation = neighbors?.find((n: any) => n.id !== product.id);
      if (!recommendation) return { message: "No recommendations found" };

      // 3. AI Explanation
      const prompt = `Product A: ${product.name} (${product.description})
      Product B: ${recommendation.name} (${recommendation.description})
      Explain in one short sentence why someone buying A might like B.`;

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      return {
        recommendedProduct: recommendation,
        reason: aiResponse.choices[0].message.content,
      };
    }),

  generateSingleEmbedding: t.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      return await getVector(input.text);
    }),
});

export type AppRouter = typeof appRouter;

// --- 4. Server Execution ---
const app = express();

app.use(cors());
app.use(express.json());

// Security: Optional - Uncomment to protect all routes
// app.use(validateApiKey); 

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), 
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Phase 3 Backend running at http://localhost:${PORT}`);
  console.log(`🔗 tRPC endpoint: http://localhost:${PORT}/trpc`);
});