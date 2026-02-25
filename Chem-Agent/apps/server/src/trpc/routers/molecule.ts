import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const moleculeRouter = router({
  predictPathway: publicProcedure
    .input(z.object({ smiles: z.string() }))
    .query(async ({ input }) => {
      // Fetch analysis from the Python AI Engine
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smiles: input.smiles }),
      });
      return response.json();
    }),
});