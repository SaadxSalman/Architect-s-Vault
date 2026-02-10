import weaviate, { WeaviateClient } from 'weaviate-client';

let client: WeaviateClient;

export const getWeaviateClient = async () => {
  if (!client) {
    client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL!, {
      authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
      headers: {
        'X-HuggingFace-Api-Key': process.env.HUGGINGFACE_API_KEY!,
      }
    });
  }
  return client;
};

export async function getProductCollection() {
  const cl = await getWeaviateClient();
  const name = 'Products';

  const exists = await cl.collections.exists(name);
  if (!exists) {
    return await cl.collections.create({
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
  return cl.collections.get(name);
}