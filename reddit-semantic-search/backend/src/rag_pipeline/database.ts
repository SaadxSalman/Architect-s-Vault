import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_ANON_KEY!
);

/**
 * Upserts post metadata for the knowledge base
 */
export async function upsertPost(title: string, url: string) {
  return await supabase.from('posts').upsert({ title, url }, { onConflict: 'title' });
}

/**
 * Saves a single Q&A interaction to the chat_history table
 */
export async function saveChatMessage(collection_name: string, query: string, answer: string) {
  const { data, error } = await supabase
    .from('chat_history')
    .insert([
      { 
        collection_name, 
        query, 
        answer 
      }
    ]);
  
  if (error) console.error("Supabase Save Error:", error.message);
  return { data, error };
}

/**
 * Retrieves all chat history ordered by most recent
 */
export async function getChatHistory() {
  return await supabase
    .from('chat_history')
    .select('*')
    .order('created_at', { ascending: false });
}