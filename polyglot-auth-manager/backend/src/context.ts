import { inferAsyncReturnType } from '@trpc/server';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // Reaching up to the shared .env

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createContext({ req, res }: CreateHTTPContextOptions) {
  const authHeader = req.headers.authorization;
  const apiKeyHeader = req.headers['x-api-key'];

  // Initialize context variables
  let user = null;
  let authType: 'none' | 'basic' | 'api-key' | 'bearer' = 'none';

  // 1. Check for API Key (Public Metrics)
  if (apiKeyHeader === process.env.SYSTEM_API_KEY) {
    authType = 'api-key';
    return { user: { role: 'system' }, authType };
  }

  // 2. Check for Basic Auth (Admin Health)
  if (authHeader?.startsWith('Basic ')) {
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    const [username, password] = credentials.split(':');
    
    if (password === process.env.ADMIN_BASIC_PASS) {
      authType = 'basic';
      return { user: { role: 'admin' }, authType };
    }
  }

  // 3. Check for Bearer JWT (Supabase/User Tasks)
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);
    
    if (supabaseUser && !error) {
      user = supabaseUser;
      authType = 'bearer';
    }
  }

  return {
    user,
    authType,
    req,
    res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;