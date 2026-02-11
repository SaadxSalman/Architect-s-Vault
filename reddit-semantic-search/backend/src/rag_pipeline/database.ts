import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_ANON_KEY!
);

export async function upsertPost(title: string, url: string) {
  return await supabase.from('posts').upsert({ title, url }, { onConflict: 'title' });
}