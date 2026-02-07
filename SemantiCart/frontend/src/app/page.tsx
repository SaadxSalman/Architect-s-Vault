'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  Loader2, 
  ArrowRight, 
  Zap, 
  RefreshCw, 
  Package, 
  Filter 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [recommendation, setRecommendation] = useState<{ product: any, reason: string } | null>(null);

  const intents = ["Summer Wedding", "Gym Session", "Office Professional", "Weekend Hike"];

  // --- Actions ---

  // Initial Fetch: Load catalog on mount
  const fetchInitialProducts = async () => {
    setLoading(true);
    try {
      const data = await trpc.getProducts.query();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialProducts();
  }, []);

  // AI Semantic Search Logic
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      fetchInitialProducts();
      return;
    }

    setLoading(true);
    try {
      const data = await trpc.search.query({ query: searchQuery });
      setProducts(data);
      
      // Contextual AI Recommendation logic
      if (data.length > 0) {
        const rec = await trpc.recommend.query({ productId: data[0].id });
        setRecommendation({ 
          product: rec.recommendedProduct, 
          reason: rec.reason || "Matches your current search vibe." 
        });
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 3) {
        performSearch(query);
      } else if (query.length === 0) {
        setProducts([]);
        setRecommendation(null);
        fetchInitialProducts();
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [query, performSearch]);

  // Admin: Sync Embeddings
  const handleSync = async () => {
    setStatus('Syncing...');
    try {
      const result = await trpc.syncProducts.mutate();
      setStatus(result.message);
      setTimeout(() => setStatus(''), 5000);
      fetchInitialProducts(); 
    } catch (err) {
      setStatus('Sync Error');
      console.error(err);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setRecommendation(null);
    fetchInitialProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero & Intent Section */}
      <section className="bg-slate-950 pt-20 pb-28 px-4 text-center text-white relative overflow-hidden">
        {/* Admin Sync Button */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={handleSync}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs transition"
          >
            <RefreshCw className={`w-3 h-3 ${status.includes('Syncing') ? 'animate-spin' : ''}`} />
            {status || 'Sync AI Engine'}
          </button>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
        >
          SHOP BY <span className="text-blue-500">INTENT</span>
        </motion.h2>
        
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Saadxsalman's AI understands context. Search for a feeling, not just a product.
        </p>

        <div className="max-w-3xl mx-auto">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your vibe (e.g. 'something for a rainy morning run')"
              className="w-full bg-slate-900 border border-slate-800 text-white py-5 pl-14 pr-14 rounded-2xl shadow-2xl outline-none focus:border-blue-500 transition-all text-lg"
            />
            {query && (
              <button onClick={clearSearch} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Intent Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-slate-500 text-sm font-medium mr-2 self-center">Try:</span>
            {intents.map(intent => (
              <button 
                key={intent}
                onClick={() => setQuery(intent)}
                className="px-4 py-1.5 rounded-full border border-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-800 hover:text-white transition"
              >
                {intent}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Recommendation Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Product List */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode='popLayout'>
              {loading && products.length === 0 ? (
                // Skeleton Loading State
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-6 rounded-3xl h-48 animate-pulse border border-slate-100" />
                ))
              ) : products.length > 0 ? (
                products.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow group"
                  >
                    <div className="w-full md:w-48 aspect-square bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">
                      <Package className="w-12 h-12 text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold group-hover:text-blue-600 transition">{product.name}</h3>
                        {product.similarity !== undefined && (
                          <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> {Math.round(product.similarity * 100)}% Match
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 mt-2 line-clamp-2">{product.description}</p>
                      
                      <div className="mt-8 flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">${product.price}</span>
                        <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition">
                          View Details <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No direct matches found.</p>
                  <p className="text-slate-400 text-sm">Try searching for something like "Minimalist Style".</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Recommendation */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {recommendation && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-blue-600 p-6 rounded-3xl text-white sticky top-10 shadow-2xl shadow-blue-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 fill-white" />
                    <span className="text-xs font-bold uppercase tracking-widest">AI Top Pick</span>
                  </div>
                  <h4 className="font-bold text-lg leading-tight mb-2">Perfect for your search</h4>
                  <p className="text-blue-100 text-sm italic mb-6">"{recommendation.reason}"</p>
                  
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <p className="font-bold text-sm">{recommendation.product.name}</p>
                    <p className="text-xs text-blue-200 mt-1">${recommendation.product.price}</p>
                    <button className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition">
                      Quick Add
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
}