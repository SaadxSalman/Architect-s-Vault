"use client";
import { useEffect, useState } from 'react';
import { TrendingUp, Package, Zap, ArrowRight, BarChart3 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  base_price: number;
  current_price: number;
  stock: number;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/products');
      const data = await res.json();
      setProducts(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
            <Zap size={16} fill="currentColor" />
            <span className="tracking-[0.2em] uppercase">AI-Optimized Pricing Live</span>
          </div>
          <h2 className="text-5xl font-extrabold tracking-tight mb-4">
            Dynamic <br /><span className="text-white/40">Marketplace.</span>
          </h2>
          <p className="text-white/50 max-w-md">
            Our Linear Regression model retrains every hour to adjust prices based on supply, demand, and competitor data.
          </p>
        </div>
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Model Status</p>
            <p className="text-sm font-mono text-emerald-400">Retrained at {lastUpdate}</p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="glass-card group rounded-3xl p-1 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-bold px-2 py-1 bg-white/5 rounded-full text-white/40 uppercase tracking-widest">
                  {p.category || 'General'}
                </span>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                  <TrendingUp size={12} />
                  LIVE PRICE
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{p.name}</h3>
              <p className="text-white/30 text-sm mb-6 line-clamp-1">Optimized by Dynamic-Price-v1.0</p>
              
              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-black price-pulse">${p.current_price}</span>
                <span className="text-lg text-white/20 line-through mb-1">${p.base_price}</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-white/40 flex items-center gap-2">
                    <Package size={14} /> Inventory
                  </span>
                  <span className={p.stock < 15 ? "text-orange-400" : "text-white"}>{p.stock} units</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-1000" 
                    style={{ width: `${(p.stock / 100) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <button className="w-full bg-white text-black py-4 font-bold flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
              PURCHASE ITEM <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}