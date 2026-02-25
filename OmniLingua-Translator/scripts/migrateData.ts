import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';
import fs from 'fs';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

async function setupSchema() {
  const schemaConfig = {
    class: 'OmniLingua_SEA',
    description: 'Dataset containing South Asian cultural nuances and idioms',
    vectorizer: 'text2vec-openai', // Or use 'text2vec-huggingface' or 'none' if providing your own vectors
    moduleConfig: {
      'text2vec-openai': { model: 'ada', type: 'text' },
    },
    properties: [
      { name: 'originalText', dataType: ['text'], description: 'The source phrase' },
      { name: 'culturalContext', dataType: ['text'], description: 'Deep cultural explanation' },
      { name: 'idiomaticMeaning', dataType: ['text'], description: 'Non-literal meaning' },
      { name: 'region', dataType: ['string'], description: 'India or Pakistan region' },
    ],
  };

  await client.schema.classCreator().withClass(schemaConfig).do();
  console.log('✅ Schema Created');
}

async function importData() {
  // Assuming your dataset is a JSON file exported from the OmniLingua-SEA corpus
  const data = JSON.parse(fs.readFileSync('./dataset.json', 'utf8'));
  
  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let count = 0;

  for (const item of data) {
    const obj = {
      class: 'OmniLingua_SEA',
      properties: {
        originalText: item.text,
        culturalContext: item.context,
        idiomaticMeaning: item.idiom,
        region: item.region,
      },
    };

    batcher = batcher.withObject(obj);
    count++;

    // Push in batches of 100 for performance
    if (count % 100 === 0) {
      await batcher.do();
      batcher = client.batch.objectsBatcher();
      console.log(`Imported ${count} items...`);
    }
  }

  await batcher.do(); // Final push
  console.log('🚀 Migration Complete!');
}

setupSchema().then(importData).catch(console.error);