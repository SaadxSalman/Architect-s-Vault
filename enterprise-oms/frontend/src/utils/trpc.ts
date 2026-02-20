import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/router'; // Ensure this points correctly to sibling backend

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      // IMPORTANT: Ensure this matches the port in your backend index.ts
      url: 'http://localhost:4000/trpc', 
    }),
  ],
});