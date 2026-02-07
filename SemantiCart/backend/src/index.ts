import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

// Supabase Init
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const t = initTRPC.create();

// Router
const appRouter = t.router({
  getProducts: t.procedure.query(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
  }),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000, () => console.log('Backend listening on port 4000'));