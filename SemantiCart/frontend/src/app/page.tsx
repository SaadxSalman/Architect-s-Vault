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
  ShoppingCart,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { loadStripe } from '@stripe/stripe-js';
import type { AppRouter } from '../../../backend/src/index';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
  
  // Cart State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  // Check for URL params for Success Page
  const isSuccess = typeof window !== 'undefined' && window.location.search.includes('success');

  const intents = ["Summer Wedding", "Gym Session", "Office Professional", "Weekend Hike"];

  // --- Calculations ---
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1;

  // --- Success View ---
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-10 bg-white">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="bg-green-100 p-6 rounded-full mb-6"
        >
          <Sparkles className="text-green-600 w-12 h-12" />
        </motion.div>
        <h1 className="text-4xl font-black tracking-tighter">PAYMENT SUCCESSFUL!</h1>
        <p className="text-gray-500 mt-4 max-w-md">
          Your semantic style is on the way, **saadxsalman**. Check your email for a receipt and tracking details.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // --- Actions ---

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

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      fetchInitialProducts();
      return;
    }

    setLoading(true);
    try {
      const data = await trpc.search.query({ query: searchQuery });
      setProducts(data);
      
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 3) {
        performSearch(query);
      } else if (query.length === 0) {
        setRecommendation(null);
        fetchInitialProducts();
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [query, performSearch]);

  // --- Cart & Checkout Logic ---
  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const handleCheckout = async () => {
    try {
      setStatus('Redirecting...');
      const { url } = await trpc.createCheckout.mutate(
        cart.map(item => ({ id: item.product.id, quantity: item.quantity }))
      );
      
      if (url) window.location.href = url;
    } catch (err) {
      alert("Checkout failed. Check stock availability.");
      setStatus('');
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 relative">
      
      {/* Floating Cart Trigger */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-40 hover:scale-110 active:scale-95 transition-all"
      >
        <ShoppingCart />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Side Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black tracking-tighter">YOUR CART</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center mt-20">
                    <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div layout key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center">
                        <Package className="text-gray-400 w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm leading-tight">{item.product.name}</h4>
                        <p className="text-blue-600 font-bold mt-1">${item.product.price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button 
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 border bg-white rounded-md hover:bg-gray-100"
                          >
                            <Minus size={14}/>
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 border bg-white rounded-md hover:bg-gray-100"
                          >
                            <Plus size={14}/>
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-300 hover:text-red-500 self-start p-1 transition"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="border-t pt-6 space-y-2 mt-4">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Tax (10%)</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-2 border-t mt-2">
                  <span>Total</span><span>${(subtotal + tax).toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || status === 'Redirecting...'}
                  className="w-full bg-slate-950 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-blue-600 transition shadow-lg active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {status === 'Redirecting...' ? 'Connecting to Stripe...' : 'Checkout Now'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero & Intent Section */}
      <section className="bg-slate-950 pt-20 pb-28 px-4 text-center text-white relative overflow-hidden">
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
          AI understands context. Search for a feeling, not just a product.
        </p>

        <div className="max-w-3xl mx-auto">
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
              <button onClick={() => setQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

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
          
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode='popLayout'>
              {loading && products.length === 0 ? (
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
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition"
                        >
                          Add to Cart <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No direct matches found.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

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
                    <button 
                      onClick={() => addToCart(recommendation.product)}
                      className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition"
                    >
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