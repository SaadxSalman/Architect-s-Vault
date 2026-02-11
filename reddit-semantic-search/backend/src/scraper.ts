import 'dotenv/config';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import weaviate, { WeaviateClient } from 'weaviate-client';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  // 1. Fetch Reddit JSON
  const response = await fetch(`https://www.reddit.com/r/${process.env.SUBREDDIT}/top.json?t=all`);
  const data: any = await response.json();
  const posts = data.data.children;

  // 2. Connect to Weaviate
  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
    process.env.WEAVIATE_URL!,
    { authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!) }
  );

  const collectionName = 'RedditPost';

  // Create Collection if not exists
  try {
    await client.collections.create({
      name: collectionName,
      vectorizers: [
        // Using Hugging Face for embeddings
        weaviate.configure.vectorizer.text2VecHuggingFace({
            model: "meta-llama/Llama-3.2-3B-Instruct", 
        })
      ]
    });
  } catch (e) { console.log("Collection might already exist"); }

  const collection = client.collections.use(collectionName);

  for (const post of posts) {
    const { title, selftext, url, id } = post.data;
    if (!selftext) continue;

    // Save metadata to Supabase
    await supabase.from('posts').upsert({ id, title, url });

    // Index content in Weaviate for semantic search
    await collection.data.insert({
      reddit_id: id,
      title: title,
      content: selftext
    });
  }
  
  console.log("Sync Complete!");
}

run();