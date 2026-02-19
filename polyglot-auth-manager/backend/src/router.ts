import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { supabase } from './supabase.js'; // MUST have .js

const t = initTRPC.context<any>().create();

export const createContext = ({ req }: any) => {
  const authHeader = req.headers.authorization;
  return { authHeader };
};

export const appRouter = t.router({
  // Phase 1: Task Management
  getTasks: t.procedure.query(async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  createTask: t.procedure
    .input(z.object({ title: z.string(), status: z.string() }))
    .mutation(async ({ input }) => {
      const { data, error } = await supabase.from('tasks').insert([input]);
      return { success: !error, data };
    }),

  // Polyglot Auth Challenge: API Key Check
  getMetrics: t.procedure.query(({ ctx }) => {
    if (ctx.authHeader !== 'Bearer postman-special-key') {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid API Key' });
    }
    return { cpu: '12%', memory: '512MB', status: 'Healthy' };
  }),
});

export type AppRouter = typeof appRouter;