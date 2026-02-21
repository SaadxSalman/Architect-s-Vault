"use client";
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { ShoppingCart, Package, ShieldCheck, FileText, Trash2, X, ChevronRight } from 'lucide-react';

export default function MedFlowApp() {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showRxModal, setShowRxModal] = useState(false);
  const [rxUrl, setRxUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // 1. Load Data & Hydrate Cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('medflow_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    fetchProducts();
    if (view === 'admin') fetchOrders();
  }, [view]);

  // 2. Persist Cart
  useEffect(() => {
    localStorage.setItem('medflow_cart', JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    const res = await fetch(`${API_URL}/api/admin/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const openCloudinary = () => {
    // @ts-ignore
    window.cloudinary.openUploadWidget({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      uploadPreset: 'medflow_unsigned'
    }, (err: any, result: any) => {
      if (result.event === 'success') setRxUrl(result.info.secure_url);
    });
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const submitOrder = async () => {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId: 'saadxsalman', // Hardcoded for demo
        cart: cart, 
        prescriptionUrl: rxUrl 
      })
    });

    if (response.ok) {
      setCart([]);
      setRxUrl("");
      setShowRxModal(false);
      alert("🏥 Order Placed Successfully! Your pharmacist will review it shortly.");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchOrders(); // Refresh list
  };

  const totalAmount = cart.reduce((a, b) => a + b.price, 0);
  const requiresRx = cart.some(p => p.isPrescriptionRequired);

  if (loading) return <div className="flex h-screen items-center justify-center font-bold">Loading MedFlow Ecosystem...</div>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans bg-[#fcfcfd] min-h-screen">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />

      {/* Modern Navigation Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-blue-600 tracking-tighter italic">MEDFLOW</h1>
          <p className="text-slate-400 text-sm font-medium">Verified Medical E-Commerce</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner">
          <button 
            onClick={() => setView('store')} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition ${view === 'store' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <ShoppingCart size={18} /> Pharmacy
          </button>
          <button 
            onClick={() => setView('admin')} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition ${view === 'admin' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Package size={18} /> Admin Portal
          </button>
        </div>
      </header>

      {view === 'store' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(p => (
              <div key={p.id} className="p-6 border border-slate-100 rounded-[2.5rem] bg-white hover:shadow-xl transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${p.isPrescriptionRequired ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                      {p.isPrescriptionRequired ? '● RX Required' : '● Over the Counter'}
                    </span>
                    <span className="text-xs font-bold text-slate-300">STOCK: {p.stock}</span>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-blue-600 transition">{p.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{p.category}</p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-3xl font-black text-slate-900">${p.price.toFixed(2)}</p>
                  <button 
                    onClick={() => setCart([...cart, p])} 
                    className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Your Cart <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">{cart.length}</span></h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingCart className="mx-auto mb-4 opacity-20" size={48} />
                  <p className="text-sm">Your medical cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</span>
                          <span className="text-xs text-slate-400">${item.price.toFixed(2)}</span>
                        </div>
                        <button onClick={() => removeFromCart(idx)} className="text-slate-300 hover:text-red-500 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 border-slate-50">
                    <div className="flex justify-between mb-4">
                      <span className="text-slate-500 font-medium">Total Amount</span>
                      <span className="text-2xl font-black text-blue-600">${totalAmount.toFixed(2)}</span>
                    </div>
                    
                    {requiresRx && (
                      <div className="flex items-center gap-2 bg-amber-50 text-amber-700 p-3 rounded-xl mb-4 text-[11px] font-bold">
                        <ShieldCheck size={16} />
                        PRESCRIPTION DOCUMENT REQUIRED
                      </div>
                    )}

                    <button 
                      onClick={() => requiresRx ? setShowRxModal(true) : submitOrder()} 
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                    >
                      Process Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Admin View - Professional Kanban Board */
        <div className="flex gap-6 overflow-x-auto pb-10 min-h-[70vh]">
          {['PENDING', 'PAID', 'SHIPPED'].map(status => (
            <div key={status} className="min-w-[350px] bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-200">
              <div className="flex justify-between items-center mb-8 px-2">
                <h2 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase">{status}</h2>
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {orders.filter(o => o.status === status).length}
                </span>
              </div>

              <div className="space-y-4">
                {orders.filter(o => o.status === status).map(o => (
                  <div key={o.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:border-blue-200 transition">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-mono text-slate-300 tracking-tighter uppercase">ID: {o.id.slice(-8)}</p>
                      {o.prescriptionUrl && (
                        <a href={o.prescriptionUrl} target="_blank" className="bg-amber-100 text-amber-700 text-[9px] px-2 py-1 rounded-md font-black flex items-center gap-1">
                          <FileText size={10} /> RX ATTACHED
                        </a>
                      )}
                    </div>
                    
                    <p className="text-2xl font-black mb-1">${o.totalPrice.toFixed(2)}</p>
                    <div className="space-y-1 mb-6">
                      {o.items?.map((item: any) => (
                        <p key={item.id} className="text-[11px] text-slate-500 font-medium">• {item.product.name} (x{item.quantity})</p>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
                      <button onClick={() => window.open(`${API_URL}/api/orders/${o.id}/invoice`)} className="flex items-center justify-center gap-2 text-[10px] font-bold bg-slate-50 text-slate-600 py-3 rounded-xl hover:bg-slate-100 transition">
                        GENERATE INVOICE <ChevronRight size={12} />
                      </button>
                      
                      {status === 'PENDING' && (
                        <button onClick={() => updateStatus(o.id, 'PAID')} className="text-[10px] font-bold bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-50">
                          CONFIRM PAYMENT & VERIFY
                        </button>
                      )}
                      {status === 'PAID' && (
                        <button onClick={() => updateStatus(o.id, 'SHIPPED')} className="text-[10px] font-bold bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition shadow-md shadow-emerald-50">
                          MARK AS DISPATCHED
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescription Upload Modal */}
      {showRxModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowRxModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
            
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>
            
            <h2 className="text-3xl font-black mb-4">Prescription Required</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Regulatory compliance requires a valid prescription for your selected items. Please upload a clear image or PDF.
            </p>
            
            <button 
              onClick={openCloudinary} 
              className={`w-full py-12 border-2 border-dashed rounded-[2rem] mb-8 font-bold transition-all flex flex-col items-center gap-2 ${rxUrl ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500'}`}
            >
              <FileText size={32} className={rxUrl ? "animate-bounce" : ""} />
              {rxUrl ? "DOCUMENT ATTACHED" : "UPLOAD MEDICAL DOCUMENT"}
            </button>

            <button 
              disabled={!rxUrl} 
              onClick={submitOrder} 
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 disabled:opacity-30 transition-all active:scale-95"
            >
              Complete Secure Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}