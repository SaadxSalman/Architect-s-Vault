import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { appRouter, createContext } from './router.js';

const app = express();

// 1. MUST HAVE THIS: This parses the body so tRPC can see it
app.use(express.json()); 

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log('🚀 Backend running on http://localhost:4000');
});