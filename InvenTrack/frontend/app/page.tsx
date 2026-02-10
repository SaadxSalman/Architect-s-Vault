"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  AlertTriangle, 
  ArrowDownLeft, 
  Plus, 
  Loader2, 
  DollarSign, 
  BarChart3 
} from 'lucide-react';

// New Component Imports
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- CONFIGURATION ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;
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

      if (response.ok) {
        fetchData();
      } else {
        alert("Transaction failed. Check backend console.");
      }
    } catch (err) {
      alert("Could not connect to backend server.");
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">
        ⚠️ Environment Variables Missing! Check your .env file.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={<DollarSign className="text-green-600" />} 
            label="Inventory Value" 
            value={`$${stats.totalValue.toLocaleString()}`} 
          />
          <StatCard 
            icon={<AlertTriangle className="text-orange-600" />} 
            label="Low Stock Alerts" 
            value={stats.lowStock} 
            subValue="Items below threshold"
            alert={stats.lowStock > 0}
          />
          <StatCard 
            icon={<BarChart3 className="text-blue-600" />} 
            label="Total Products" 
            value={stats.totalItems} 
          />
        </div>

        {/* Product List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-slate-500 font-medium">Syncing with Supabase...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Product Info</th>
                    <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Stock Level</th>
                    <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Price</th>
                    <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Status</th>
                    <th className="p-5 text-sm font-semibold text-slate-600 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-5">
                        <div className="font-bold text-slate-800">{product.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{product.sku}</div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{product.stock_quantity}</span>
                          <span className="text-slate-300 text-xs italic">/ min {product.reorder_level}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="text-sm font-medium text-slate-700">${product.price}</div>
                        <div className="text-[10px] text-slate-400">Cost: ${product.cost_price}</div>
                      </td>
                      <td className="p-5">
                        <StockBadge qty={product.stock_quantity} min={product.reorder_level} />
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleTransaction(product.id, 'IN')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs font-bold"
                          >
                            <Plus size={14} /> RESTOCK
                          </button>
                          <button 
                            onClick={() => handleTransaction(product.id, 'OUT')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-all text-xs font-bold"
                          >
                            <ArrowDownLeft size={14} /> SALE
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

// --- REMAINING SUB-COMPONENTS ---

function StatCard({ icon, label, value, subValue, alert }: any) {
  return (
    <div className={`p-6 rounded-2xl bg-white border shadow-sm transition-transform hover:scale-[1.02] ${alert ? 'border-orange-200' : 'border-slate-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${alert ? 'bg-orange-50' : 'bg-slate-50'}`}>{icon}</div>
        {alert && <div className="animate-pulse w-2 h-2 rounded-full bg-orange-500" />}
      </div>
      <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
      <h2 className="text-3xl font-black tracking-tight">{value}</h2>
      {subValue && <p className="text-xs text-slate-400 mt-2">{subValue}</p>}
    </div>
  );
}

function StockBadge({ qty, min }: { qty: number, min: number }) {
  if (qty <= 0) return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase ring-1 ring-red-200">Out of Stock</span>;
  if (qty <= min) return <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase ring-1 ring-orange-200">Low Stock</span>;
  return <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase ring-1 ring-green-200">Healthy</span>;
}