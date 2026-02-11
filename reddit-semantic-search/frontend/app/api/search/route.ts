import { NextResponse } from 'next/server';
import weaviate from 'weaviate-client';
import { QueryAgent } from 'weaviate-agents';

export async function POST(req: Request) {
  try {
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

    // Initialize the Agent
    const agent = new QueryAgent(client, {
        // Grant the agent access to your collection
        collections: ['RedditPost']
    });

    // Run the search
    // Using .ask() allows the agent to reason and summarize the results
    const response = await agent.ask(query);

    return NextResponse.json({ 
        answer: response.finalAnswer,
        sources: response.searchResults.objects.map(obj => obj.properties)
    });

  } catch (error: any) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}