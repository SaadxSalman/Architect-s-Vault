'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, MessageSquareQuote } from 'lucide-react';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/index';

// Component Imports
import { SuccessScreen } from '../page_components/SuccessScreen';
import { ThemeAdminToggles } from '../page_components/ThemeAdminToggles';
import { CartDrawer } from '../page_components/CartDrawer';
import { HeroSearch } from '../page_components/HeroSearch';
import { ProductList } from '../page_components/ProductList';
import { Recommendation } from '../page_components/Recommendation';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:4000/trpc' })],
});

export default function Home() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const isSuccess = typeof window !== 'undefined' && window.location.search.includes('success');
  
  // Traditional categories instead of "vibes"
  const intents = ["Electronics", "Footwear", "Kitchen", "Accessories"];

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => { fetchInitialProducts(); }, []);

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
    if (!searchQuery.trim()) { fetchInitialProducts(); return; }
    setLoading(true);
    try {
      const data = await trpc.search.query({ query: searchQuery });
      setProducts(data);
      
      // Traditional Recommendation Logic
      if (data.length > 0) {
        const rec = await trpc.recommend.query({ productId: data[0].id });
        // Correcting the object structure to match ProductRecommendation.tsx
        setRecommendation({ 
          recommendedProduct: rec.recommendedProduct, 
          reason: rec.reason || "Matches your selection." 
        });
      } else {
        setRecommendation(null);
      }
    } catch (err) { 
      console.error("Search error:", err); 
      setRecommendation(null);
    } finally { 
      setLoading(false); 
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 2) performSearch(query);
      else if (query.length === 0) { 
        setRecommendation(null); 
        fetchInitialProducts(); 
      }
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [query, performSearch]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.product.id !== id));

  const handleCheckout = async () => {
    try {
      setStatus('Redirecting...');
      const { url } = await trpc.createCheckout.mutate(cart.map(item => ({ id: item.product.id, quantity: item.quantity })));
      if (url) window.location.href = url;
    } catch (err) { 
      alert("Checkout failed."); 
      setStatus(''); 
    }
  };

  if (isSuccess) return <SuccessScreen />;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 dark:text-white transition-colors pb-20 relative">
      <ThemeAdminToggles darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Cart Button */}
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

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        handleCheckout={handleCheckout} 
        status={status} 
      />

      <HeroSearch 
        query={query} 
        setQuery={setQuery} 
        loading={loading} 
        intents={intents} 
      />

      <div className="max-w-[1600px] mx-auto px-4 -mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
             <ProductList products={products} loading={loading} addToCart={addToCart} />
          </div>
          
          {recommendation && (
            <div className="lg:w-80 flex-shrink-0 pt-16">
               <Recommendation recommendation={recommendation} addToCart={addToCart} />
            </div>
          )}
        </div>

        {/* Traditional Feedback Section (AI labels removed) */}
        <section className="mt-20">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <MessageSquareQuote className="text-blue-500" /> Customer Feedback Trends
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ReviewBox title="Pros" color="green" content="Users love the traditional interface and fast search results." />
              <ReviewBox title="Cons" color="red" content="Standard text search requires exact keyword matches." />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const ReviewBox = ({ title, color, content }: { title: string, color: string, content: string }) => (
  <div className={`p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-l-4 ${color === 'green' ? 'border-green-500' : 'border-red-500'} transition-colors`}>
    <span className={`font-bold uppercase text-xs ${color === 'green' ? 'text-green-600' : 'text-red-600'}`}>{title}</span>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{content}</p>
  </div>
);