import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../../server/router';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_TRPC_URL || 'http://localhost:4000/trpc',
        }),
      ],
    };
  },
  ssr: false,
});