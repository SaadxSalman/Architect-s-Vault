import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { initTRPC, TRPCError } from '@trpc/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import Stripe from 'stripe';
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  apiVersion: '2023-10-16' 
});

// --- 2. Tools & Utilities ---
const embeddingCache: Record<string, number[]> = {};

async function getVector(text: string): Promise<number[]> {
  const cleanText = text.toLowerCase().trim();
  
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
    embeddingCache[cleanText] = vector;
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

// --- 3. tRPC Initialization ---
interface Context {
  user?: { id: string };
}

const t = initTRPC.context<Context>().create();

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

  // --- ADMIN & MANAGEMENT ---
  addProduct: t.procedure
    .input(z.object({ name: z.string(), description: z.string(), price: z.number() }))
    .mutation(async ({ input }) => {
      // AI generates tags and category automatically
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Categorize this product and give 3 tags: " + input.name }],
      });
      
      // Using existing getVector utility
      const embedding = await getVector(`${input.name} ${input.description}`);
      
      const { data, error } = await supabase.from('products').insert({
        ...input,
        embedding,
        category: aiResponse.choices[0].message.content
      }).select().single();

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      return data;
    }),

  // --- AI FEATURES ---
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

  recommend: t.procedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', input.productId)
        .single();

      if (!product) throw new TRPCError({ code: 'NOT_FOUND' });
      if (!product.embedding) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Product missing embedding' });

      const { data: neighbors } = await supabase.rpc('match_products', {
        query_embedding: product.embedding,
        match_threshold: 0.3,
        match_count: 2,
      });

      const recommendation = neighbors?.find((n: any) => n.id !== product.id);
      if (!recommendation) return { message: "No recommendations found" };

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

  getReviewSummary: t.procedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('content')
        .eq('product_id', input.productId);

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      if (!reviews || reviews.length === 0) return "No reviews available to summarize.";

      const allText = reviews.map(r => r.content).join(". ");

      const summary = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize these reviews into a 2-bullet list (Pros/Cons): ${allText}` }],
      });

      return summary.choices[0].message.content;
    }),

  // --- CART & CHECKOUT ---
  addToCart: t.procedure
    .input(z.object({ productId: z.string(), quantity: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const { data: product } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', input.productId)
        .single();

      if (!product || product.stock_quantity < input.quantity) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Item out of stock' });
      }

      const { error } = await supabase.from('cart_items').upsert({
        user_id: ctx.user.id,
        product_id: input.productId,
        quantity: input.quantity
      });

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      return { success: true };
    }),

  getCart: t.procedure.query(async ({ ctx }) => {
    if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', ctx.user.id);

    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  createCheckout: t.procedure
    .input(z.array(z.object({ id: z.string(), quantity: z.number() })))
    .mutation(async ({ input }) => {
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .in('id', input.map(i => i.id));

      if (!products) throw new TRPCError({ code: 'NOT_FOUND', message: "Products not found" });

      const lineItems = input.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) throw new TRPCError({ code: 'BAD_REQUEST', message: `Product ${item.id} not found` });
        
        return {
          price_data: {
            currency: 'usd',
            product_data: { 
                name: product.name, 
                images: product.image_url ? [product.image_url] : [] 
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: item.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/canceled`,
      });

      return { url: session.url };
    }),
});

export type AppRouter = typeof appRouter;

// --- 4. Server Execution ---
const app = express();
app.use(cors());

// --- STRIPE WEBHOOK HANDLER ---
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const { error } = await supabase.from('orders').insert({
      stripe_session_id: session.id,
      total_amount: session.amount_total! / 100,
      status: 'completed'
    });

    if (error) console.error("Supabase Order Insert Error:", error);
    console.log("💰 Payment Success! Order recorded.");
  }

  res.json({ received: true });
});

app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => {
      return {
        user: { id: 'test-user-uuid' } 
      };
    }, 
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});