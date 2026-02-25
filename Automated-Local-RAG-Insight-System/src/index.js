import express from 'express';
import cors from 'cors';
import { client, hf } from './weaviateClient.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * NEW: Endpoint to list all available collections (files)
 * This is useful for populating a dropdown menu in your UI.
 */
app.get('/collections', async (req, res) => {
  try {
    const collectionsInfo = await client.collections.listAll();
    const collectionNames = collectionsInfo.map(c => c.name);
    res.json({ collections: collectionNames });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Failed to fetch collections list." });
  }
});

app.post('/ask', async (req, res) => {
  try {
    const { query, collectionName } = req.body; 
    if (!query) return res.status(400).json({ error: "Query is required" });

    let topResults = [];

    // --- SELECTION LOGIC ---
    if (collectionName) {
      // 1. Search only the SPECIFIC collection requested
      const exists = await client.collections.exists(collectionName);
      if (!exists) {
        return res.status(404).json({ error: `Collection "${collectionName}" not found.` });
      }

      console.log(`🔍 Searching specifically in: ${collectionName}`);
      const collection = client.collections.get(collectionName);
      const result = await collection.query.hybrid(query, {
        limit: 6,
        alpha: 0.5,
      });
      topResults = result.objects;

    } else {
      // 2. Default: Search across ALL collections if none specified
      console.log("🌐 No specific collection selected. Searching all documents...");
      const collectionsInfo = await client.collections.listAll();
      const allCollectionNames = collectionsInfo.map(c => c.name);

      if (allCollectionNames.length === 0) {
        return res.json({ 
          answer: "No documents found. Please ingest some files first.", 
          sources: [] 
        });
      }

      let allResults = [];
      for (const name of allCollectionNames) {
        const collection = client.collections.get(name);
        const result = await collection.query.hybrid(query, {
          limit: 3,
          alpha: 0.5,
        });
        allResults.push(...result.objects);
      }
      
      // Sort global results by score and take top 6
      allResults.sort((a, b) => (b.metadata?.score || 0) - (a.metadata?.score || 0));
      topResults = allResults.slice(0, 6);
    }

    if (topResults.length === 0) {
      return res.json({ 
        answer: "I couldn't find any relevant data in the selected files.", 
        sources: [] 
      });
    }

    // 3. Format Context for the LLM
    const context = topResults
      .map(o => `Source: ${o.properties.fileName}\nContent: ${o.properties.content}`)
      .join("\n\n---\n\n");

    // 4. Chat Completion with Llama-3.2-3B-Instruct
    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are the ALRIS AI assistant. Provide concise answers based ONLY on the provided context."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${query}`
        }
      ],
      max_tokens: 500,
      temperature: 0.1,
    });

    res.json({ 
      answer: response.choices[0].message.content.trim(),
      sources: [...new Set(topResults.map(o => o.properties.fileName))]
    });

  } catch (error) {
    console.error("ALRIS Engine Error:", error);
    res.status(500).json({ error: "The Llama engine encountered an error." });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 ALRIS Llama-Engine running at http://localhost:${PORT}`);
});