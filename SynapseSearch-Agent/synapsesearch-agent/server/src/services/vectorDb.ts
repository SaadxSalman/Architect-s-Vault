import weaviate, { WeaviateClient } from 'weaviate-ts-client';

export const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: process.env.WEAVIATE_HOST || 'your-cluster.weaviate.network',
  apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ''),
});