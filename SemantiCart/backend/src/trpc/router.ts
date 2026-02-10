import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { supabase } from '../lib/clients';
import { weaviateClient } from '../lib/weaviate';

export const appRouter = router({
  /**
   * Health Check: Checks both Supabase and Weaviate
   */
  healthCheck: publicProcedure.query(async () => {
    const dbCheck = await supabase.from('products').select('id', { count: 'exact', head: true });
    const weaviateCheck = await weaviateClient.isReady();
    
    if (dbCheck.error || !weaviateCheck) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'One or more services down' });
    }
    return { status: 'ok', database: 'connected', vectorStore: 'connected' };
  }),

  /**
   * Semantic/Hybrid Search: The new core engine
   */
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      try {
        const collection = weaviateClient.collections.get('Product');
        
        // Performing Hybrid Search (Alpha 0.5 balances keywords and semantics)
        const result = await collection.query.hybrid(input.query, {
          limit: 20,
          alpha: 0.5, 
          returnProperties: ['supabase_id', 'name', 'description', 'category', 'price'],
          fusionType: 'RelativeScore'
        });

        // Mapping Weaviate results to match your existing Product frontend types
        return result.objects.map(obj => ({
          id: obj.properties.supabase_id,
          name: obj.properties.name,
          description: obj.properties.description,
          category: obj.properties.category,
          price: obj.properties.price,
          _score: obj.metadata?.score // Optional: for debugging relevance
        }));
      } catch (error: any) {
        throw new TRPCError({ 
          code: 'INTERNAL_SERVER_ERROR', 
          message: `Semantic search failed: ${error.message}` 
        });
      }
    }),

  /**
   * Get All Products (Fallback to Supabase)
   */
  getProducts: publicProcedure.query(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  /**
   * Related Products: Still uses Supabase for strict category filtering
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
        .limit(4);

      return recommendations ?? [];
    }),

  /**
   * Product Reviews
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