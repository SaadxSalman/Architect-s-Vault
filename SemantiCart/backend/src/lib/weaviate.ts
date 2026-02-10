import weaviate from 'weaviate-client';

export const weaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL!,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
    headers: { 'X-HuggingFace-Api-Key': process.env.HUGGINGFACE_API_KEY! }
  }
);

export async function initProductCollection() {
  const name = 'Product';
  const exists = await weaviateClient.collections.exists(name);
  
  if (exists) {
    return weaviateClient.collections.get(name);
  }

  console.log(`🚀 Creating collection: ${name}...`);

  return await weaviateClient.collections.create({
    name,
    vectorizers: [
      weaviate.configure.vectors.text2VecHuggingFace({
        name: 'product_vector',
        sourceProperties: ['name', 'description', 'category'],
        model: 'Snowflake/snowflake-arctic-embed-l-v2.0',
      }),
    ],
    properties: [
      { name: 'supabase_id', dataType: 'text' },
      { name: 'name', dataType: 'text' },
      { name: 'description', dataType: 'text' },
      { name: 'category', dataType: 'text' },
      { name: 'price', dataType: 'number' },
    ],
  });
}