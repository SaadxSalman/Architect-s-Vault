import { router } from '../trpc';
import { monitorRouter } from './monitor';

export const appRouter = router({
  monitor: monitorRouter,
});

export type AppRouter = typeof appRouter;