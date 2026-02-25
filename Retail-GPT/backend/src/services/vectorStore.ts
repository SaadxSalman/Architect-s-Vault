import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080', // Default Weaviate port
});

export const initializeSchema = async () => {
  const classObj = {
    class: 'ProductStyle',
    vectorizer: 'text2vec-openai', // Or your custom Gemma embedding
    properties: [
      { name: 'aesthetic', dataType: ['text'] },
      { name: 'styleTags', dataType: ['text[]'] }
    ]
  };
  return await client.schema.classCreator().withClass(classObj).do();
};