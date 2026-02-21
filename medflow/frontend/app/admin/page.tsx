"use client";
import React, { useEffect, useState } from 'react';
import { 
  Package, CheckCircle, Truck, Eye, RefreshCcw, 
  Plus, Trash2, LayoutDashboard, Pill, AlertCircle 
} from 'lucide-react';

const STAGES = ['Pending', 'Verified', 'Shipped', 'Delivered'];

export default function AdminDashboard() {
  const [view, setView] = useState<'orders' | 'inventory'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State for New Product
  const [newProd, setNewProd] = useState({ 
    name: '', price: '', category: 'General', isPrescriptionRequired: false, stock: '50' 
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordRes, prodRes] = await Promise.all([
        fetch('http://localhost:5000/api/orders'),
        fetch('http://localhost:5000/api/products')
      ]);
      setOrders(await ordRes.json());
      setProducts(await prodRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd),
    });
    if (res.ok) {
      setNewProd({ name: '', price: '', category: 'General', isPrescriptionRequired: false, stock: '50' });
      fetchData();
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 -m-6 p-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl w-fit border border-slate-200 shadow-sm">
        <button 
          onClick={() => setView('orders')}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition ${view === 'orders' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <LayoutDashboard size={18} /> Orders
        </button>
        <button 
          onClick={() => setView('inventory')}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition ${view === 'inventory' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Package size={18} /> Inventory
        </button>
      </div>

      {view === 'orders' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Order Fulfillment</h1>
              <p className="text-slate-500 text-sm mt-1">Real-time status tracking for MedFlow.</p>
            </div>
            <button onClick={fetchData} className="p-2 text-slate-400 hover:text-sky-600 transition">
              <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STAGES.map((stage) => (
              <div key={stage} className="bg-slate-100/50 p-4 rounded-3xl min-h-[600px] border border-slate-200/50">
                <div className="flex items-center gap-2 mb-6 px-2">
                  <div className={`w-2 h-2 rounded-full ${stage === 'Pending' ? 'bg-amber-500' : 'bg-sky-500'}`} />
                  <h2 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest">{stage}</h2>
                  <span className="ml-auto bg-white text-slate-500 text-[10px] px-2 py-0.5 rounded-full border shadow-sm">
                    {orders.filter(o => o.status === stage).length}
                  </span>
                </div>
                <div className="space-y-4">
                  {orders.filter(o => o.status === stage).map(order => (
                    <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">{order.id}</span>
                        {order.hasRx && <span className="bg-red-50 text-red-600 text-[9px] px-2 py-0.5 rounded-full font-bold border border-red-100">Rx</span>}
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">{order.customer}</h3>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 italic">"{order.items}"</p>
                      <div className="mt-4 flex gap-2">
                        {stage !== 'Delivered' && (
                          <button onClick={() => updateStatus(order.id, STAGES[STAGES.indexOf(stage) + 1])} className="flex-1 bg-slate-900 text-white text-[10px] py-2 rounded-lg font-bold hover:bg-sky-600 transition">Next Stage</button>
                        )}
                        <button onClick={() => window.open(`http://localhost:5000/api/invoice/${order.id}`, '_blank')} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-sky-600 transition border"><Eye size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="text-sky-600" /> New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Product Name</label>
                  <input required className="w-full p-3 rounded-xl bg-slate-50 border mt-1 text-sm outline-none focus:border-sky-500" value={newProd.name} onChange={e => setNewProd({...newProd, name: e.target.value})} placeholder="e.g. Amoxicillin" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Price ($)</label>
                    <input type="number" step="0.01" required className="w-full p-3 rounded-xl bg-slate-50 border mt-1 text-sm" value={newProd.price} onChange={e => setNewProd({...newProd, price: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Initial Stock</label>
                    <input type="number" required className="w-full p-3 rounded-xl bg-slate-50 border mt-1 text-sm" value={newProd.stock} onChange={e => setNewProd({...newProd, stock: e.target.value})} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border">
                  <input type="checkbox" checked={newProd.isPrescriptionRequired} onChange={e => setNewProd({...newProd, isPrescriptionRequired: e.target.checked})} className="w-4 h-4 accent-sky-600" />
                  <span className="text-xs font-bold text-slate-600">Requires Prescription (Rx)</span>
                </div>
                <button type="submit" className="w-full bg-sky-600 text-white py-4 rounded-2xl font-bold hover:bg-sky-700 transition shadow-lg shadow-sky-100">Add to Catalog</button>
              </form>
            </div>

            {/* Product List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Active Catalog</h2>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-500">{products.length} Items</span>
                </div>
                <div className="overflow-hidden rounded-2xl border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold">
                      <tr>
                        <th className="p-4">Product</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Type</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map(prod => (
                        <tr key={prod.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-4 font-bold text-slate-700">{prod.name}</td>
                          <td className="p-4 text-sky-600 font-bold">${prod.price}</td>
                          <td className="p-4">
                            <span className={`flex items-center gap-1 font-bold ${prod.stock < 10 ? 'text-red-500' : 'text-slate-500'}`}>
                              {prod.stock < 10 && <AlertCircle size={12} />} {prod.stock}
                            </span>
                          </td>
                          <td className="p-4">
                            {prod.isPrescriptionRequired ? 
                              <span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold border border-red-100">Rx</span> : 
                              <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold border border-emerald-100">OTC</span>
                            }
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => deleteProduct(prod.id)} className="p-2 text-slate-300 hover:text-red-500 transition"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}