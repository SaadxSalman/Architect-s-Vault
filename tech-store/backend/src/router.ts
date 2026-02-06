import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context.js';

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
   * Storefront / Product Procedures
   */
  getProducts: t.procedure.query(async ({ ctx }) => {
    // Added the .order() sorting from your latest snippet
    const { data, error } = await ctx.supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });

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
      const { data, error } = await ctx.supabase
        .from('orders')
        .insert([input])
        .select();

      if (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      }

      return { success: true, data };
    }),

  /**
   * Admin Dashboard Procedures
   */
  addProduct: t.procedure
    .input(z.object({ 
      name: z.string(), 
      description: z.string(), 
      price: z.number() 
    }))
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('products')
        .insert([input])
        .select(); // Added select() to ensure data is returned if needed

      if (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      }
      return data;
    }),

  deleteProduct: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { error } = await ctx.supabase
        .from('products')
        .delete()
        .eq('id', input.id);

      if (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      }
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;