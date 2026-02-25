import weaviate from 'weaviate-client';
import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';

dotenv.config();

// 1. Initialize Hugging Face for Summarization
export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// 2. Initialize Weaviate Client
const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL, {
  authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
  skipInitChecks: true, 
  timeout: {
    init: 30,
    query: 60,
  },
  headers: {
    'X-HuggingFace-Api-Key': process.env.HUGGINGFACE_API_KEY,
  }
});

/**
 * Sets up the Weaviate collection with a dynamic name based on the file.
 */
export async function setupCollection(collectionName) {
  try {
    // Check if collection exists
    const exists = await client.collections.exists(collectionName);
    if (exists) {
      console.log(`📡 Collection "${collectionName}" already exists.`);
      return client.collections.get(collectionName);
    }

    console.log(`🚀 Creating collection: ${collectionName}...`);

    // Create Collection using the Hugging Face specific vectorizer
    return await client.collections.create({
      name: collectionName,
      vectorizers: [
        weaviate.configure.vectors.text2VecHuggingFace({
          name: 'content_vector',
          sourceProperties: ['content'],
          model: 'Snowflake/snowflake-arctic-embed-l-v2.0',
        }),
      ],
      properties: [
        { 
          name: 'content', 
          dataType: 'text',
          description: 'The text chunk from the document',
          tokenization: 'word',
        },
        { 
          name: 'fileName', 
          dataType: 'text',
          description: 'The source file name',
        },
      ],
    });
  } catch (error) {
    console.error(`❌ Error setting up collection ${collectionName}:`, error);
    throw error;
  }
}

export { client };