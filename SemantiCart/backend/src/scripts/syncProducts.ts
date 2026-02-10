import { supabase } from '../lib/clients';
import { setupProductCollection } from '../lib/weaviate';

async function syncSupabaseToWeaviate() {
  console.log("🔄 Starting Sync...");
  const collection = await setupProductCollection();

  // 1. Fetch products from Supabase
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) throw error;

  console.log(`📦 Found ${products.length} products. Indexing...`);

  // 2. Batch insert into Weaviate
  // Weaviate automatically handles embedding generation via the HuggingFace header
  for (const item of products) {
    await collection.data.insert({
      properties: {
        supabase_id: item.id.toString(),
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price
      }
    });
  }

  console.log("✅ Semantic Indexing Complete.");
}

syncSupabaseToWeaviate().catch(console.error);