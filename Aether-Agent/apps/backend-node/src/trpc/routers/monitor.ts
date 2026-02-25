import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const monitorRouter = router({
  getActiveCrises: publicProcedure.query(async () => {
    // In the future, this calls Milvus/MongoDB
    return [
      { id: 1, type: 'Flood', severity: 'High', location: 'Region A' },
      { id: 2, type: 'Wildfire', severity: 'Medium', location: 'Region B' },
    ];
  }),
  analyzeSatellite: publicProcedure
    .input(z.object({ imageUrl: z.string().url() }))
    .mutation(async ({ input }) => {
      // Logic to trigger your Rust-core Vision Transformer
      return { status: "processing", taskId: "abc-123" };
    }),
});

// Inside analyzeSatellite mutation
const response = await fetch('http://localhost:50051/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image_url: input.imageUrl }),
});

const result = await response.json();

// Update MongoDB with the findings
await CrisisModel.create({
  type: result.crisis_type,
  severity: result.severity,
  timestamp: new Date(),
});