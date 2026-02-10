import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { supabase } from '../lib/clients';

export const appRouter = router({
  /**
   * Health Check: Simple connectivity test
   */
  healthCheck: publicProcedure.query(async () => {
    const { data, error } = await supabase.from('products').select('id', { count: 'exact', head: true });
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return { status: 'ok', database: 'connected' };
  }),

  /**
   * Get All Products: Useful for initial landing pages
   */
  getProducts: publicProcedure.query(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  /**
   * Search: The core search engine logic
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
   * Related Products: For the product detail view
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
        .limit(4); // Increased limit for better UI layout

      return recommendations ?? [];
    }),

  /**
   * Product Reviews: Fetch top snippets
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
      return reviews || [];
    }),
});

export type AppRouter = typeof appRouter;