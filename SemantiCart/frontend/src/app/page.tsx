'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  Loader2, 
  Zap, 
  RefreshCw, 
  Package,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Moon, 
  Sun, 
  PlusCircle, 
  MessageSquareQuote 
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
  
  // New UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for URL params for Success Page
  const isSuccess = typeof window !== 'undefined' && window.location.search.includes('success');
  const intents = ["Summer Wedding", "Gym Session", "Office Professional", "Weekend Hike"];

  // --- Effects ---
  
  // Dark Mode Toggle
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Initial Fetch
  useEffect(() => {
    fetchInitialProducts();
  }, []);

  // --- Calculations ---
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1;

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

  // --- Views ---

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-10 bg-white dark:bg-slate-950">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6">
          <Sparkles className="text-green-600 w-12 h-12" />
        </motion.div>
        <h1 className="text-4xl font-black tracking-tighter dark:text-white">PAYMENT SUCCESSFUL!</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md">
          Your semantic style is on the way, **saadxsalman**. Check your email for a receipt.
        </p>
        <button onClick={() => window.location.href = '/'} className="mt-8 bg-black dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 dark:text-white transition-colors pb-20 relative">
      
      {/* Dark Mode & Admin Toggle */}
      <div className="fixed top-20 right-4 flex flex-col gap-2 z-50">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700 transition-all hover:scale-110"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-600" />}
        </button>
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg text-xs font-bold hover:scale-110 transition-all"
        >
          {isAdmin ? 'EXIT' : 'ADMIN'}
        </button>
      </div>

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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-[70] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black tracking-tighter dark:text-white">YOUR CART</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition">
                  <X className="dark:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center mt-20">
                    <Package className="w-12 h-12 text-gray-200 dark:text-slate-700 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div layout key={item.product.id} className="flex gap-4 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                      <div className="w-20 h-20 bg-gray-200 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                        <Package className="text-gray-400 w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm leading-tight dark:text-white">{item.product.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">${item.product.price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 border dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md">
                            <Minus size={14} className="dark:text-white" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 border dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md">
                            <Plus size={14} className="dark:text-white" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-500 self-start p-1 transition">
                        <Trash2 size={18}/>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="border-t dark:border-slate-800 pt-6 space-y-2 mt-4">
                <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-2 border-t dark:border-slate-800 mt-2 dark:text-white">
                  <span>Total</span><span>${(subtotal + tax).toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || status === 'Redirecting...'}
                  className="w-full bg-slate-950 dark:bg-blue-600 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-blue-700 transition shadow-lg disabled:bg-gray-400"
                >
                  {status === 'Redirecting...' ? 'Connecting to Stripe...' : 'Checkout Now'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero & Search Section */}
      <section className="bg-slate-950 pt-20 pb-28 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <button onClick={handleSync} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs transition">
            <RefreshCw className={`w-3 h-3 ${status.includes('Syncing') ? 'animate-spin' : ''}`} />
            {status || 'Sync AI Engine'}
          </button>
        </div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
          SHOP BY <span className="text-blue-500">INTENT</span>
        </motion.h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">AI understands context. Search for a feeling, not just a product.</p>

        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </div>
            <input 
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your vibe..."
              className="w-full bg-slate-900 border border-slate-800 text-white py-5 pl-14 pr-14 rounded-2xl shadow-2xl outline-none focus:border-blue-500 transition-all text-lg"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {intents.map(intent => (
              <button key={intent} onClick={() => setQuery(intent)} className="px-4 py-1.5 rounded-full border border-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-800 hover:text-white transition">
                {intent}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        
        {/* Admin Panel (Conditional) */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto p-10 bg-blue-50 dark:bg-slate-900 rounded-3xl mb-10 border-2 border-blue-200 dark:border-blue-900 overflow-hidden"
            >
              <h2 className="text-2xl font-black mb-4 flex items-center gap-2 dark:text-white">
                <PlusCircle className="text-blue-600" /> Add New Product (AI Auto-Vectorized)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Product Name" className="p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-blue-500" />
                <input placeholder="Price" className="p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-blue-500" />
                <textarea placeholder="Description" className="col-span-2 p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-blue-500" />
                <button className="col-span-2 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition">Upload to Store</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode='popLayout'>
              {loading && products.length === 0 ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl h-48 animate-pulse border border-slate-100 dark:border-slate-800" />
                ))
              ) : products.length > 0 ? (
                products.map((product, idx) => (
                  <motion.div
                    key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-xl dark:hover:shadow-blue-900/10 transition-shadow group"
                  >
                    <div className="w-full md:w-48 aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                      <Package className="w-12 h-12 text-slate-200 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold group-hover:text-blue-600 transition dark:text-white">{product.name}</h3>
                        {product.similarity !== undefined && (
                          <span className="text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> {Math.round(product.similarity * 100)}% Match
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{product.description}</p>
                      <div className="mt-8 flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">${product.price}</span>
                        <button onClick={() => addToCart(product)} className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
                          Add to Cart <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500">No direct matches found.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <AnimatePresence>
              {recommendation && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-blue-600 p-6 rounded-3xl text-white sticky top-10 shadow-2xl shadow-blue-200 dark:shadow-none">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 fill-white" />
                    <span className="text-xs font-bold uppercase tracking-widest">AI Top Pick</span>
                  </div>
                  <h4 className="font-bold text-lg leading-tight mb-2">Perfect for your search</h4>
                  <p className="text-blue-100 text-sm italic mb-6">"{recommendation.reason}"</p>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <p className="font-bold text-sm">{recommendation.product.name}</p>
                    <p className="text-xs text-blue-200 mt-1">${recommendation.product.price}</p>
                    <button onClick={() => addToCart(recommendation.product)} className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition">
                      Quick Add
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Review Section with AI Summary */}
        <section className="mt-20">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <MessageSquareQuote className="text-blue-500" /> AI Review Insight
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-l-4 border-green-500 transition-colors">
                <span className="font-bold text-green-600 dark:text-green-400 uppercase text-xs">Pros</span>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Extremely lightweight; great for summer runs; breathable fabric.</p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-l-4 border-red-500 transition-colors">
                <span className="font-bold text-red-600 dark:text-red-400 uppercase text-xs">Cons</span>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Sizes run small; limited color options available.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}