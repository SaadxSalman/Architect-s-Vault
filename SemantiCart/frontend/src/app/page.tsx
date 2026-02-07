'use client';

import { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, Package, RefreshCw } from 'lucide-react';
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
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Footwear', 'Apparel', 'Accessories'];

  // --- Actions ---

  // Initial Fetch: Load all products on mount
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Note: Using getProducts for the initial catalog view
      const data = await trpc.getProducts.query();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // AI Semantic Search
  const handleSemanticSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      fetchProducts(); // Reset to full list if query is empty
      return;
    }
    setLoading(true);
    try {
      const results = await trpc.search.query({ query });
      setProducts(results);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Admin: Sync Embeddings
  const handleSync = async () => {
    setStatus('Syncing with AI...');
    try {
      const result = await trpc.syncProducts.mutate();
      setStatus(result.message);
      setTimeout(() => setStatus(''), 5000); // Clear status after 5s
      fetchProducts(); 
    } catch (err) {
      setStatus('Error syncing.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-900 pt-20 pb-32 px-4 text-center text-white relative">
        <div className="absolute top-4 right-4">
            <button 
              onClick={handleSync}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs transition"
            >
              <RefreshCw className={`w-3 h-3 ${status.includes('Syncing') ? 'animate-spin' : ''}`} />
              {status || 'Sync AI Embeddings'}
            </button>
        </div>

        <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Find exactly what you mean.</h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
          Saadxsalman's AI-powered semantic search understands context, not just keywords. 
          Try searching for <span className="italic opacity-80">"something for a rainy morning run."</span>
        </p>

        {/* Semantic Search Bar */}
        <form onSubmit={handleSemanticSearch} className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you are looking for..."
              className="w-full py-4 pl-12 pr-32 rounded-2xl text-gray-900 shadow-2xl focus:ring-4 focus:ring-blue-400/50 outline-none"
            />
            <button 
              type="submit"
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" /> Search
            </button>
          </div>
        </form>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          
          {/* Traditional Category Filter */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 text-gray-500 mr-4 border-r pr-4">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Filter</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-100 rounded-2xl mb-4" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                 </div>
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100 transition group-hover:shadow-lg group-hover:border-blue-100">
                      {/* Only show Match % if it's a search result (similarity exists) */}
                      {product.similarity !== undefined && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-blue-600 flex items-center gap-1 shadow-sm border border-blue-100 z-10">
                          <Sparkles className="w-3 h-3" /> {Math.round(product.similarity * 100)}% Match
                        </div>
                      )}
                      
                      {/* Placeholder for Product Image */}
                      <div className="w-full h-full flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform duration-500">
                        <Package className="w-16 h-16" />
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition truncate">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3 min-h-[40px]">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-xl text-gray-900">${product.price}</p>
                      <button className="text-xs font-semibold text-blue-600 hover:underline">View Details</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or category filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}