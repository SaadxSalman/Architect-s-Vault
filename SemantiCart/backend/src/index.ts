import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { supabase } from './lib/clients';
import { appRouter } from './trpc/router';

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({
      user: { id: 'test-user-uuid' } 
    }), 
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});