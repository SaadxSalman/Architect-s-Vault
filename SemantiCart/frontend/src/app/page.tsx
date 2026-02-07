'use client';

import { useState, useEffect } from 'react';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/index';

// tRPC Client initialization
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

export default function Home() {
  // State for Product Display
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for Sync Status
  const [status, setStatus] = useState('');

  // Fetch products on mount
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await trpc.getProducts.query();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle AI Sync Mutation
  const handleSync = async () => {
    setStatus('Syncing with AI...');
    try {
      const result = await trpc.syncProducts.mutate();
      setStatus(result.message);
      // Refresh the list after sync to show any new updates
      fetchProducts();
    } catch (err) {
      setStatus('Error syncing. Check console.');
      console.error(err);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center gap-8">
      {/* Admin Header & Sync Section */}
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Saadxsalman Admin Dashboard</h1>
        <button 
          onClick={handleSync}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition shadow-md"
        >
          Sync Product Embeddings
        </button>
        {status && (
          <p className="mt-2 p-2 px-4 bg-blue-100 text-blue-700 rounded-lg text-sm border border-blue-200">
            {status}
          </p>
        )}
      </header>

      <hr className="w-full border-gray-200" />

      {/* Product Catalog Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Product Catalog</h2>
        
        {loading ? (
          <div className="flex justify-center p-10">
            <p className="animate-pulse text-gray-500">Loading products from Supabase...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <h3 className="font-bold text-lg text-gray-800">{p.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{p.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-mono text-blue-600 font-semibold">${p.price}</span>
                    <span className="text-xs text-gray-400">ID: {p.id.toString().slice(0, 8)}</span>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center p-10 bg-gray-50 rounded-lg border border-dashed">
                <p className="text-gray-500">No products found in Supabase.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}