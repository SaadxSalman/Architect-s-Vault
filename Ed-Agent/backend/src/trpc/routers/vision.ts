import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { analyzeHandwrittenWork } from '../../agents/visionAgent';

const t = initTRPC.create();

export const visionRouter = t.router({
  analyzeWork: t.procedure
    .input(z.object({ imageBase64: z.string() }))
    .mutation(async ({ input }) => {
      const feedback = await analyzeHandwrittenWork(input.imageBase64);
      return feedback;
    }),
});