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

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    console.log(`📥 Scraping from: ${url}`);
    const response = await fetch(url);
    const data: any = await response.json();
    
    const posts = data.data?.children || [];
    const collection = await setupCollection();
    
    for (const post of posts) {
      const { title, selftext, url: postUrl } = post.data;
      const content = `${title}. ${selftext || ""}`;
      
      await supabase.from('posts').upsert({ title, url: postUrl }, { onConflict: 'title' });

      await collection.data.insert({
        properties: { content, title, url: postUrl }
      });
    }

    // This will now show in your terminal upon completion
    console.log("✅ Ingestion Complete"); 
    
    res.json({ message: `Successfully scraped ${posts.length} items.` });
  } catch (error) {
    console.error("❌ Ingestion Error:", error);
    res.status(500).json({ error: "Failed to scrape the provided link." });
  }
});

app.post('/search', async (req, res) => {
  const { query } = req.body;
  const collection = client.collections.get("RedditPosts");
  
  const result = await collection.query.hybrid(query, { limit: 3 });
  const context = result.objects.map(o => o.properties.content).join("\n\n");

  const aiRes = await hf.chatCompletion({
    model: "meta-llama/Llama-3.2-3B-Instruct",
    messages: [
      { role: "system", content: "You are a helpful assistant. Answer based on the provided context." },
      { role: "user", content: `Context: ${context}\n\nQuestion: ${query}` }
    ],
    max_tokens: 300,
  });

  res.json({ answer: aiRes.choices[0].message.content, sources: result.objects });
});

app.listen(3002, () => {
  console.log("🚀 Backend on http://localhost:3002");
});