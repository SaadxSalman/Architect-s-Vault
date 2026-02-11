import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { client, hf, setupCollection, generateCollectionName } from './weaviateClient.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// 1. Fetch all existing collections for the sidebar
app.get('/collections', async (req, res) => {
  try {
    const list = await client.collections.listAll();
    const names = list.map(c => c.name);
    res.json({ collections: names });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch collections" });
  }
});

// 2. Dynamic Scrape & Ingest
app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const collectionName = generateCollectionName(url);
    const { collection, newlyCreated } = await setupCollection(collectionName);

    if (!newlyCreated) {
      return res.json({ 
        message: `Collection '${collectionName}' already exists.`,
        collectionName,
        isDuplicate: true
      });
    }

    console.log(`📥 Scraping: ${url}`);
    const response = await fetch(url);
    const rawData: any = await response.json();
    
    let items = [];
    // Reddit-specific logic
    if (rawData.data?.children) {
      items = rawData.data.children.map((c: any) => ({
        title: c.data.title,
        content: `${c.data.title}. ${c.data.selftext || ""}`,
        url: c.data.url
      }));
    } 
    // Generic JSON array logic
    else if (Array.isArray(rawData)) {
      items = rawData.map((item: any) => ({
        title: item.title || item.name || "Untitled",
        content: item.body || item.content || item.description || JSON.stringify(item),
        url: item.url || url
      }));
    }

    for (const item of items) {
      await supabase.from('posts').upsert({ title: item.title, url: item.url }, { onConflict: 'title' });
      await collection.data.insert({
        properties: { content: item.content, title: item.title, url: item.url }
      });
    }

    res.json({ 
      message: `Successfully created '${collectionName}' with ${items.length} items.`,
      collectionName 
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Failed to process JSON link." });
  }
});

// 3. Search endpoint
app.post('/search', async (req, res) => {
  const { query, collectionName } = req.body;
  if (!collectionName) return res.status(400).json({ error: "No collection selected" });

  try {
    const collection = client.collections.get(collectionName);
    const result = await collection.query.hybrid(query, { limit: 3 });
    const context = result.objects.map(o => o.properties.content).join("\n\n");

    const aiRes = await hf.chatCompletion({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        { role: "system", content: "You are a helpful assistant. Answer based strictly on the context provided." },
        { role: "user", content: `Context: ${context}\n\nQuestion: ${query}` }
      ],
      max_tokens: 400,
    });

    res.json({ answer: aiRes.choices[0].message.content, sources: result.objects });
  } catch (error) {
    res.status(500).json({ error: "Search failed." });
  }
});

app.listen(3002, () => console.log("🚀 Backend running on port 3002"));