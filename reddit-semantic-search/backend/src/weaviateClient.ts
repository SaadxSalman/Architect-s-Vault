import weaviate from 'weaviate-client';
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL!, {
  authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
  headers: { 'X-HuggingFace-Api-Key': process.env.HUGGINGFACE_API_KEY! }
});

/**
 * Normalizes a URL into a valid Weaviate Collection Name.
 * Rules: Must start with uppercase, alphanumeric only.
 */
export function generateCollectionName(url: string): string {
  try {
    const urlObj = new URL(url);
    // Get the last part of the path, or hostname if path is empty
    const pathParts = urlObj.pathname.split('/').filter(p => p && !p.endsWith('.json'));
    const rawName = pathParts.length > 0 ? pathParts[pathParts.length - 1] : urlObj.hostname.split('.')[0];
    
    // Capitalize and strip non-alphanumeric
    const cleanName = rawName.replace(/[^a-zA-Z0-9]/g, '');
    const finalName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1) + "Collection";
    
    return finalName;
  } catch (e) {
    return "ExternalCollection";
  }
}

export async function setupCollection(name: string) {
  const exists = await client.collections.exists(name);
  if (exists) return { collection: client.collections.get(name), newlyCreated: false };

  const collection = await client.collections.create({
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

  return { collection, newlyCreated: true };
}

export { client };