import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';

// Initialize tRPC with the context type
const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  /**
   * Authentication Procedures
   */
  signUp: t.procedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });

      if (error) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: error.message });
      }
      return data;
    }),

  signIn: t.procedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: error.message });
      }
      return data;
    }),

  /**
   * Product Procedures
   */
  getProducts: t.procedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from('products').select('*');
    
    if (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
    return data || [];
  }),

  /**
   * Order Procedures
   */
  createOrder: t.procedure
    .input(z.object({ 
      productId: z.number(), 
      email: z.string().email() 
    }))
    .mutation(async ({ input, ctx }) => {
      // Optional: Check if the user is authenticated via context before allowing an order
      // const { data: { user } } = await ctx.supabase.auth.getUser();
      // if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const { data, error } = await ctx.supabase
        .from('orders')
        .insert([input])
        .select(); // Added .select() to return the created record

      if (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      }

      return { success: true, data };
    }),
});

export type AppRouter = typeof appRouter;