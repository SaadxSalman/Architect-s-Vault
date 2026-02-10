import { supabase } from './clients.js';
import { weaviateClient, initProductCollection } from './weaviate.js';

export async function syncSupabaseToWeaviate() {
  const collection = await initProductCollection();

  // 1. Fetch products from Supabase
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error("❌ Failed to fetch products from Supabase:", error.message);
    return;
  }

  if (products && products.length > 0) {
    console.log(`🔄 Syncing ${products.length} products to Weaviate...`);

    // Prepare batch objects
    const objects = products.map(p => ({
      properties: {
        supabase_id: String(p.id),
        name: p.name,
        description: p.description || '',
        category: p.category || 'Uncategorized',
        price: Number(p.price)
      }
    }));

    // Use insertMany to avoid hitting Hugging Face rate limits with individual calls
    const response = await collection.data.insertMany(objects);
    
    if (response.hasErrors) {
      console.error("⚠️ Some items failed to sync:", JSON.stringify(response.errors, null, 2));
    } else {
      console.log(`✅ Successfully indexed ${products.length} products.`);
    }
  }

  // 2. Real-time Listener for future updates
  supabase
    .channel('product-sync')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'products' }, async (payload) => {
      const p = payload.new;
      try {
        await collection.data.insert({
          properties: {
            supabase_id: String(p.id),
            name: p.name,
            description: p.description,
            category: p.category,
            price: p.price
          }
        });
        console.log(`✨ Real-time sync: Added ${p.name}`);
      } catch (err) {
        console.error(`❌ Real-time sync failed for ${p.name}:`, err);
      }
    })
    .subscribe();
}