import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/index';

export const trpc = createTRPCReact<AppRouter>();