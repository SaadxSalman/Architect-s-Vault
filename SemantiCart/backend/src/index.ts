import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { initTRPC, TRPCError } from '@trpc/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// 1. Initialize Clients
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 2. AI Utility: Text to Vector
// Converts product metadata into a 1536-dimensional vector
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error: any) {
    // Handle OpenAI specific rate limits
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

// 3. tRPC Initialization
const t = initTRPC.create();

const appRouter = t.router({
  // Legacy support/Basic fetch
  getProducts: t.procedure.query(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  // Health Check & DB connection test
  healthCheck: t.procedure.query(async () => {
    const { data, error } = await supabase.from('products').select('id', { count: 'exact', head: true });
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return { status: 'ok', database: 'connected', totalProducts: data };
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
        const embedding = await generateEmbedding(textToEmbed);
        
        return supabase
          .from('products')
          .update({ embedding })
          .eq('id', product.id);
      })
    );

    return { message: `Synced ${updates.length} products.` };
  }),

  // Manual trigger for search or individual items
  generateSingleEmbedding: t.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      return await generateEmbedding(input.text);
    }),
});

export type AppRouter = typeof appRouter;

// 4. Server Execution
const app = express();
app.use(cors());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    // Optional: Add context here if you add auth later
    createContext: () => ({}), 
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`🔗 tRPC endpoint: http://localhost:${PORT}/trpc`);
});