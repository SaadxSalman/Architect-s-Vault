import weaviate from 'weaviate-client';
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL!, {
  authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
  headers: { 'X-HuggingFace-Api-Key': process.env.HUGGINGFACE_API_KEY! }
});

export async function setupCollection() {
  const name = "RedditPosts";
  const exists = await client.collections.exists(name);
  if (exists) return client.collections.get(name);

  return await client.collections.create({
    name,
    vectorizers: [
      weaviate.configure.vectors.text2VecHuggingFace({
        name: 'content_vector',
        sourceProperties: ['content'],
        model: 'Snowflake/snowflake-arctic-embed-l-v2.0',
      }),
    ],
    properties: [
      { name: 'content', dataType: 'text' },
      { name: 'title', dataType: 'text' },
      { name: 'url', dataType: 'text' },
    ],
  });
}

export { client };