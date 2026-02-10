import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { supabase } from '../lib/clients';

export const appRouter = router({
  /**
   * Health Check: Ensures database connectivity
   */
  healthCheck: publicProcedure.query(async () => {
    const { data, error } = await supabase.from('products').select('id', { count: 'exact', head: true });
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return { status: 'ok', database: 'connected', totalProducts: data };
  }),

  /**
   * Get All Products
   */
  getProducts: publicProcedure.query(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  /**
   * Optimized Traditional Search
   */
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .textSearch('fts_tokens', input.query, {
          type: 'websearch',
          config: 'english'
        })
        .limit(20);

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      return data;
    }),

  /**
   * Add Product
   */
  addProduct: publicProcedure
    .input(z.object({ 
      name: z.string(), 
      description: z.string(), 
      price: z.number(),
      category: z.string().default('Uncategorized'),
      stock_quantity: z.number().default(0)
    }))
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from('products')
        .insert([input])
        .select()
        .single();

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      return data;
    }),

  /**
   * Recommendation Logic
   */
  recommend: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const { data: product } = await supabase
        .from('products')
        .select('id, category')
        .eq('id', input.productId)
        .single();

      if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

      const { data: recommendations } = await supabase
        .from('products')
        .select('*')
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(2);

      return recommendations && recommendations.length > 0 
        ? { 
            recommendedProducts: recommendations, 
            reason: `More from the ${product.category} category` 
          }
        : { message: "No similar products found" };
    }),

  /**
   * Reviews: Basic Fetch
   */
  getReviewSummary: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('content')
        .eq('product_id', input.productId)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      if (!reviews || reviews.length === 0) return "No reviews available.";

      return "Customer Highlights: " + reviews.map(r => r.content).join(" | ");
    }),

  /**
   * Cart Logic
   */
  addToCart: publicProcedure
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

  getCart: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', ctx.user.id);
    
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),
});

export type AppRouter = typeof appRouter;