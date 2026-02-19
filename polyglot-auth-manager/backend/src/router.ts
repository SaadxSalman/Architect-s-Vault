import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  // 1. Public Metrics (API Key Auth)
  getMetrics: t.procedure.query(({ ctx }) => {
    if (ctx.authType !== 'api-key') throw new TRPCError({ code: 'UNAUTHORIZED' });
    return { cpu: "12%", memory: "512MB", status: "Healthy" };
  }),

  // 2. Admin Health (Basic Auth)
  getSystemHealth: t.procedure.query(({ ctx }) => {
    if (ctx.authType !== 'basic') throw new TRPCError({ code: 'UNAUTHORIZED' });
    return { database: "Connected", latency: "14ms" };
  }),

  // 3. Protected Tasks (JWT/Supabase Auth)
  getTasks: t.procedure
    .input(z.object({ status: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) throw new TRPCError({ code: 'FORBIDDEN' });
      // In a real app, query Supabase here
      return [{ id: 1, title: "Master Postman", status: input.status || "pending" }];
    }),
});

export type AppRouter = typeof appRouter;