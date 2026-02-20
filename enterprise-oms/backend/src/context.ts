import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Singleton Supabase Instance
 * Prevents initializing a new client for every tRPC call, 
 * which is better for performance and resource management.
 */
let supabaseInstance: SupabaseClient | null = null;

const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables in context initialization.');
  }

  supabaseInstance = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return supabaseInstance;
};

/**
 * tRPC Context Creator
 */
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const supabase = getSupabase();

  return {
    req,
    res,
    supabase,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;