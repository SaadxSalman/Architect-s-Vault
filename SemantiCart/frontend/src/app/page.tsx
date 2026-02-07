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
  // --- State Management ---
  const [products, setProducts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // --- Actions ---

  // Fetch all products (Catalog View)
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

  // AI Vector Search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const data = await trpc.search.query({ query });
      setSearchResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Admin: Sync Embeddings
  const handleSync = async () => {
    setStatus('Syncing with AI...');
    try {
      const result = await trpc.syncProducts.mutate();
      setStatus(result.message);
      fetchProducts(); // Refresh list to ensure data is current
    } catch (err) {
      setStatus('Error syncing. Check console.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-10 flex flex-col gap-12">
      
      {/* 1. Admin & Search Header */}
      <header className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">Saadxsalman Admin Dashboard</h1>
        
        {/* Search Bar Section */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl flex gap-2">
          <input 
            className="flex-1 p-3 border rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search for something (e.g., 'comfortable shoes for running')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Sync Button */}
        <div className="flex flex-col items-center gap-2">
          <button 
            onClick={handleSync}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition shadow-md text-sm"
          >
            Sync Product Embeddings
          </button>
          {status && (
            <p className="p-2 px-4 bg-blue-100 text-blue-700 rounded-lg text-xs border border-blue-200">
              {status}
            </p>
          )}
        </div>
      </header>

      <hr className="border-gray-200" />

      {/* 2. Search Results Section (Only shows when results exist) */}
      {searchResults.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">AI Search Results</h2>
          <div className="space-y-4">
            {searchResults.map((item) => (
              <div key={item.id} className="p-4 bg-blue-50/30 border border-blue-100 rounded-xl flex justify-between items-center shadow-sm">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                    {Math.round(item.similarity * 100)}% Match
                  </span>
                  <p className="font-mono mt-1 text-lg text-gray-800">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setSearchResults([])} 
            className="mt-4 text-sm text-gray-400 hover:underline"
          >
            Clear results
          </button>
        </section>
      )}

      {/* 3. Main Product Catalog Section */}
      <section className="w-full">
        <h2 className="text-2xl font-bold mb-6">Product Catalog</h2>
        
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
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-mono text-blue-600 font-semibold">${p.price}</span>
                    <span className="text-xs text-gray-400">ID: {p.id.toString().slice(0, 8)}</span>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && !loading && (
              <div className="text-center p-10 bg-gray-50 rounded-lg border border-dashed">
                <p className="text-gray-500">No products found in Supabase.</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}