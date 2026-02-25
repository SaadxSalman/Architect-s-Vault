import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  getLiveStats: procedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ input }) => {
      // Fetch real-time analytics from MongoDB or Rust cache
      return {
        possession: "Team A",
        predictedPlay: "Pick and Roll",
        confidence: 0.89
      };
    }),
});

export type AppRouter = typeof appRouter;