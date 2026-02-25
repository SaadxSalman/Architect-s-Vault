import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { generateCurriculum } from '../../agents/curriculumAgent';

const t = initTRPC.create();

export const curriculumRouter = t.router({
  createPath: t.procedure
    .input(z.object({ info: z.string() }))
    .mutation(async ({ input }) => {
      const path = await generateCurriculum(input.info);
      return path;
    }),
});