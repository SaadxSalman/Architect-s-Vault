import weaviate, { ApiKey } from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080', // Replace with your cloud URL for production
});

export const initGenomicSchema = async () => {
  const schemaConfig = {
    class: 'GenomicEmbedding',
    description: 'Stores molecular embeddings of gene variants',
    vectorizer: 'none', // We provide our own embeddings from the Rust engine
    properties: [
      {
        name: 'geneSymbol',
        dataType: ['string'],
        description: 'The standard gene symbol (e.g., BRCA1)',
      },
      {
        name: 'encryptedDataShard',
        dataType: ['text'],
        description: 'The actual encrypted genomic data blob',
      },
      {
        name: 'privacyLevel',
        dataType: ['int'],
        description: 'Sensitivity score used by the Validation Agent',
      }
    ],
  };

  await client.schema.classCreator().withClass(schemaConfig).do();
};