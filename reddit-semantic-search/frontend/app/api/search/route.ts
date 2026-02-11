import { NextResponse } from 'next/server';
import weaviate from 'weaviate-client';
import { QueryAgent } from 'weaviate-agents';

export async function POST(req: Request) {
  const { query } = await req.json();

  const client = await weaviate.connectToWeaviateCloud(
    process.env.WEAVIATE_URL!,
    {
      authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
      headers: {
        "X-HuggingFace-Api-Key": process.env.HF_TOKEN!,
      }
    }
  );

  const qa = new QueryAgent(client, { collections: ['RedditPost'] });
  
  // Using Search Mode (Retrieval only as requested)
  const response = await qa.search(query, { limit: 5 });

  return NextResponse.json({ results: response.searchResults.objects });
}