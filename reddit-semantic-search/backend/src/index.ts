import express from 'express';
import cors from 'cors';
import { client } from './weaviateClient.js';
import { processJsonLink } from './rag_pipeline/ingest.js';
import { performRAGSearch } from './rag_pipeline/retrieve.js';
import { saveChatMessage, getChatHistory } from './rag_pipeline/database.js';

const app = express();
app.use(cors());
app.use(express.json());

// Fetch all existing Weaviate collections
app.get('/collections', async (req, res) => {
  try {
    const list = await client.collections.listAll();
    const names = list.map(c => c.name);
    res.json({ collections: names });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch collections" });
  }
});

// Fetch all saved chat history from Supabase
app.get('/chat-history', async (req, res) => {
  try {
    const { data, error } = await getChatHistory();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Dynamic Scrape & Ingest
app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const result = await processJsonLink(url);
    
    if (result.isDuplicate) {
      return res.json({ 
        message: `Collection '${result.collectionName}' already exists.`,
        collectionName: result.collectionName,
        isDuplicate: true
      });
    }

    res.json({ 
      message: `Successfully created '${result.collectionName}' with ${result.count} items.`,
      collectionName: result.collectionName 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process JSON link." });
  }
});

// Search endpoint with History Persistence
app.post('/search', async (req, res) => {
  const { query, collectionName } = req.body;
  if (!collectionName) return res.status(400).json({ error: "No collection selected" });

  try {
    // 1. Perform the RAG search
    const data = await performRAGSearch(query, collectionName);
    
    // 2. Persist the interaction to Supabase
    await saveChatMessage(collectionName, query, data.answer);
    
    // 3. Return results to frontend
    res.json(data);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Search failed." });
  }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));