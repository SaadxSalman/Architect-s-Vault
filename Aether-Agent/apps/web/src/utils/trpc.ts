import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend-node/src/trpc/routers/_app';

export const trpc = createTRPCReact<AppRouter>();