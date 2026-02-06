import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../backend/src/router';

export const trpc = createTRPCReact<AppRouter>();