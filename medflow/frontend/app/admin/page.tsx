"use client";
import React, { useEffect, useState } from 'react';
import { Package, CheckCircle, Truck, ClipboardList, Eye, RefreshCcw } from 'lucide-react';

const STAGES = ['Pending', 'Verified', 'Shipped', 'Delivered'];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Order Fulfillment</h1>
          <p className="text-slate-500">Live dashboard for MedFlow logistics.</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="p-2 text-slate-400 hover:text-sky-600 transition"
        >
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {STAGES.map((stage) => (
          <div key={stage} className="bg-slate-100/50 p-4 rounded-2xl min-h-[500px] border border-slate-200/50">
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className={`w-2 h-2 rounded-full ${stage === 'Pending' ? 'bg-amber-500' : 'bg-sky-500'}`}></span>
              <h2 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest">{stage}</h2>
              <span className="ml-auto bg-white text-slate-500 text-[10px] px-2 py-0.5 rounded-full border">
                {orders.filter(o => o.status === stage).length}
              </span>
            </div>

            <div className="space-y-4">
              {orders
                .filter((order) => order.status === stage)
                .map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono font-bold text-sky-600">{order.id}</span>
                      {order.hasRx && (
                        <span className="bg-red-50 text-red-600 text-[9px] px-1.5 py-0.5 rounded font-bold border border-red-100">Rx</span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm truncate">{order.customer}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{order.items}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-2">${Number(order.total).toFixed(2)}</p>
                    
                    <div className="mt-4 flex gap-2">
                      {stage !== 'Delivered' && (
                        <button 
                          onClick={() => updateStatus(order.id, STAGES[STAGES.indexOf(stage) + 1])}
                          className="flex-1 bg-slate-900 text-white text-[10px] py-2 rounded-lg font-bold hover:bg-sky-600 transition shadow-sm"
                        >
                          Next Stage
                        </button>
                      )}
                      <button 
                        onClick={() => window.open(`http://localhost:5000/api/invoice/${order.id}`, '_blank')}
                        className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-sky-600 transition border border-slate-100"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}