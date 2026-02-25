import weaviate, { WeaviateClient } from 'weaviate-ts-client';

export const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080', // Default for Docker
});