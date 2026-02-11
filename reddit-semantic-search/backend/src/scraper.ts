import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import weaviate, { type WeaviateClient, dataType } from 'weaviate-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, WEAVIATE_URL, WEAVIATE_API_KEY, HF_TOKEN } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !WEAVIATE_URL || !WEAVIATE_API_KEY || !HF_TOKEN) {
  throw new Error("Missing environment variables in root .env");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log("🚀 Starting Semantic Scraper for saadxsalman...");

  try {
    const client: WeaviateClient = await weaviate.connectToWeaviateCloud(WEAVIATE_URL!, {
      authCredentials: new weaviate.ApiKey(WEAVIATE_API_KEY!),
      headers: { "X-HuggingFace-Api-Key": HF_TOKEN! }
    });

    const collectionName = 'RedditPost';
    const exists = await client.collections.exists(collectionName);

    if (!exists) {
      console.log(`📦 Creating collection: ${collectionName}...`);
      await client.collections.create({
        name: collectionName,
        // FIX: Modern Weaviate requires 'vectors' (plural) with a name
        vectorizers: [
          weaviate.configure.vectors.text2VecHuggingFace({
            name: 'default', // This was the missing link
            sourceProperties: ['content', 'title'],
            model: 'meta-llama/Llama-3.2-3B-Instruct',
          })
        ],
        properties: [
          { name: 'reddit_id', dataType: dataType.TEXT },
          { name: 'title', dataType: dataType.TEXT },
          { name: 'content', dataType: dataType.TEXT },
        ]
      });
    }

    const response = await fetch(`https://www.reddit.com/r/movies/top.json?t=all`);
    const redditData: any = await response.json();
    const posts = redditData.data.children;
    const collection = client.collections.use(collectionName);

    for (const post of posts) {
      const { title, selftext, url, id } = post.data;
      if (!selftext) continue;

      await supabase.from('posts').upsert({ id, title, url });
      
      // Data insertion remains the same
      await collection.data.insert({
        reddit_id: id,
        title: title,
        content: selftext
      });
      console.log(`✅ Indexed: ${title.substring(0, 35)}...`);
    }

    console.log("✨ Scrape Complete!");
  } catch (error) {
    console.error("❌ Fatal Error:", error);
  } finally {
    process.exit(0);
  }
}

run();