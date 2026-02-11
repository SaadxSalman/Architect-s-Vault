import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { client, hf, setupCollection } from './weaviateClient.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Automatic Ingestion on Startup
async function ingestReddit() {
  console.log("📥 Scraping Reddit...");
  const response = await fetch('https://www.reddit.com/r/movies/top.json?t=all');
  const data: any = await response.json();
  const posts = data.data.children;

  const collection = await setupCollection();
  
  for (const post of posts) {
    const { title, selftext, url } = post.data;
    const content = `${title}. ${selftext}`;
    
    // Save to Supabase for metadata persistence
    await supabase.from('posts').upsert({ title, url }, { onConflict: 'title' });

    // Insert into Weaviate
    await collection.data.insert({
      properties: { content, title, url }
    });
  }
  console.log("✅ Ingestion Complete");
}

app.post('/search', async (req, res) => {
  const { query } = req.body;
  const collection = client.collections.get("RedditPosts");
  
  const result = await collection.query.hybrid(query, { limit: 3 });
  const context = result.objects.map(o => o.properties.content).join("\n\n");

  const aiRes = await hf.chatCompletion({
    model: "meta-llama/Llama-3.2-3B-Instruct",
    messages: [
      { role: "system", content: "You are a movie expert. Answer based on these Reddit posts." },
      { role: "user", content: `Context: ${context}\n\nQuestion: ${query}` }
    ],
    max_tokens: 300,
  });

  res.json({ answer: aiRes.choices[0].message.content, sources: result.objects });
});

app.listen(3002, async () => {
  console.log("🚀 Backend on http://localhost:3002");
  await ingestReddit(); 
});