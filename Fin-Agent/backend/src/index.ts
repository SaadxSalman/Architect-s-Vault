import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import express from 'express';

const t = initTRPC.create();

const appRouter = t.router({
  getMarketSummary: t.procedure
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      // Logic to trigger Python Data Retrieval Agent
      return { symbol: input.symbol, price: 150.25, sentiment: "Bullish" };
    }),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));
app.listen(4000);