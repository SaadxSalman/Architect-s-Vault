import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // Extract the auth token from headers
  const token = req.headers.authorization?.split(' ')[1];
  
  return {
    req,
    res,
    supabase,
    userToken: token,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;