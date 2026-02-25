import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { exec } from 'child_process';

export const sentimentRouter = router({
  analyze: publicProcedure
    .input(z.object({ text: z.string(), chartUrl: z.string().optional() }))
    .mutation(async ({ input }) => {
      return new Promise((resolve, reject) => {
        // Execute Python script and pass data via arguments
        exec(`python3 src/agents/sentiment_analysis.py "${input.text}"`, (error, stdout) => {
          if (error) reject(error);
          resolve({ result: stdout.trim() });
        });
      });
    }),
});