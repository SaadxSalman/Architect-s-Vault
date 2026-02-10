"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react'; // Imported from Header.tsx
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Layout Components
import Footer from '@/components/Footer';

// Page Components
import StatsGrid from '../page_components/StatsGrid';
import ProductTable from '../page_components/ProductTable';

const BACKEND_URL = "http://localhost:5000/api";

export default function InventoryDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ totalValue: 0, lowStock: 0, totalItems: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      if (data) {
        setProducts(data);
        const val = data.reduce((acc, p) => acc + (p.stock_quantity * p.cost_price), 0);
        const low = data.filter(p => p.stock_quantity <= p.reorder_level).length;
        setStats({ totalValue: val, lowStock: low, totalItems: data.length });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleTransaction(productId: string, type: 'IN' | 'OUT') {
    const qtyStr = prompt(`Enter quantity to ${type === 'IN' ? 'restock' : 'sell'}:`);
    const quantity = parseInt(qtyStr || "0");
    if (isNaN(quantity) || quantity <= 0) return;

    try {
      const response = await fetch(`${BACKEND_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, type, quantity })
      });

      if (response.ok) fetchData();
      else alert("Transaction failed.");
    } catch (err) {
      alert("Could not connect to backend server.");
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isSupabaseConfigured) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">
        ⚠️ Environment Variables Missing! Check your .env file.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Integrated Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Inventory Dashboard
            </h1>
            <p className="text-slate-500">Welcome back, saadxsalman.</p>
          </div>

          <div className="relative group">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" 
              size={18} 
            />
            <input
              type="text"
              placeholder="Search by SKU or Name..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-80 transition-all bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <StatsGrid stats={stats} />
        
        <ProductTable 
          loading={loading} 
          products={filteredProducts} 
          onTransaction={handleTransaction} 
        />
        
        <Footer />
      </div>
    </div>
  );
}