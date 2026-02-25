// backend-node/src/trpc/router.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  analyzeSlide: t.procedure
    .input(z.object({ imageBase64: z.string(), history: z.string() }))
    .mutation(async ({ input }) => {
      // Direct call to Python AI Service
      const response = await fetch('http://localhost:8000/diagnose/pathology', {
        method: 'POST',
        body: JSON.stringify(input)
      });
      return response.json();
    }),
});

export type AppRouter = typeof appRouter;