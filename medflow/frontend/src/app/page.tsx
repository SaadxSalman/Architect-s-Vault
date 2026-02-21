"use client";
import React, { useState, useEffect } from 'react';
import Script from 'next/script';

export default function MedFlowApp() {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showRxModal, setShowRxModal] = useState(false);
  const [rxUrl, setRxUrl] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/products`).then(res => res.json()).then(setProducts);
    if (view === 'admin') fetch(`${API_URL}/api/admin/orders`).then(res => res.json()).then(setOrders);
  }, [view, API_URL]);

  const openCloudinary = () => {
    // @ts-ignore
    window.cloudinary.openUploadWidget({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      uploadPreset: 'medflow_unsigned'
    }, (err: any, result: any) => {
      if (result.event === 'success') setRxUrl(result.info.secure_url);
    });
  };

  const submitOrder = async () => {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId: 'saadxsalman', 
        cart: cart, 
        prescriptionUrl: rxUrl 
      })
    });

    if (response.ok) {
      setCart([]);
      setRxUrl("");
      setShowRxModal(false);
      alert("Order Placed Successfully!");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const totalAmount = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />

      {/* Navigation */}
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black text-blue-600 tracking-tighter italic">MEDFLOW</h1>
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button onClick={() => setView('store')} className={`px-8 py-2 rounded-xl text-sm font-bold transition ${view === 'store' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500'}`}>Pharmacy</button>
          <button onClick={() => setView('admin')} className={`px-8 py-2 rounded-xl text-sm font-bold transition ${view === 'admin' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500'}`}>Admin Portal</button>
        </div>
      </nav>

      {view === 'store' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="p-8 border rounded-[3rem] bg-white hover:shadow-2xl transition-all border-slate-100 group">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${p.isPrescriptionRequired ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                {p.category}
              </span>
              <h3 className="text-2xl font-bold mt-4 group-hover:text-blue-600 transition">{p.name}</h3>
              <p className="text-3xl font-black mt-6">${p.price.toFixed(2)}</p>
              <button onClick={() => setCart([...cart, p])} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg">Add to Cart</button>
            </div>
          ))}

          {/* Persistent Floating Cart */}
          {cart.length > 0 && (
            <div className="fixed bottom-10 right-10 bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl w-80 border border-white/10 animate-in fade-in slide-in-from-bottom-5">
                <h4 className="font-bold mb-4 text-blue-400">Your Prescription Cart ({cart.length})</h4>
                <div className="flex justify-between mb-6 border-t border-white/10 pt-4">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-black text-xl">${totalAmount.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => cart.some(p => p.isPrescriptionRequired) ? setShowRxModal(true) : submitOrder()} 
                  className="w-full bg-blue-500 py-4 rounded-2xl font-bold hover:bg-blue-400 transition"
                >
                  Checkout Now
                </button>
            </div>
          )}
        </div>
      ) : (
        /* Admin View - Kanban Board */
        <div className="flex gap-6 overflow-x-auto pb-10">
          {['PENDING', 'PAID', 'SHIPPED'].map(status => (
            <div key={status} className="min-w-[380px] bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200">
              <h2 className="text-xs font-black text-slate-400 mb-8 tracking-[0.3em] uppercase px-2">{status}</h2>
              {orders.filter(o => o.status === status).map(o => (
                <div key={o.id} className="bg-white p-6 rounded-3xl shadow-sm mb-4 border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-xs font-mono text-slate-300">#{o.id.slice(-8)}</p>
                    {o.prescriptionUrl && <span className="bg-amber-50 text-amber-600 text-[10px] px-2 py-1 rounded-lg font-bold">RX ATTACHED</span>}
                  </div>
                  <p className="text-2xl font-black mb-1">${o.totalPrice.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-400 mb-4">{o.items?.length || 0} Items ordered</p>
                  
                  <div className="mt-6 flex flex-col gap-2">
                    <button onClick={() => window.open(`${API_URL}/api/orders/${o.id}/invoice`)} className="text-[10px] font-bold bg-slate-100 text-slate-700 py-3 rounded-xl hover:bg-slate-200 transition">VIEW INVOICE</button>
                    {status === 'PENDING' && <button onClick={() => updateStatus(o.id, 'PAID')} className="text-[10px] font-bold bg-blue-50 text-blue-600 py-3 rounded-xl hover:bg-blue-100 transition">CONFIRM PAYMENT</button>}
                    {status === 'PAID' && <button onClick={() => updateStatus(o.id, 'SHIPPED')} className="text-[10px] font-bold bg-emerald-50 text-emerald-600 py-3 rounded-xl hover:bg-emerald-100 transition">MARK AS SHIPPED</button>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Prescription Upload Modal */}
      {showRxModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white p-10 rounded-[3.5rem] max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-3xl font-black mb-4">RX Required</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Safety First! One or more items in your cart require a valid prescription. Please upload it now.</p>
            
            <button onClick={openCloudinary} className={`w-full py-10 border-2 border-dashed rounded-3xl mb-8 font-bold transition-all ${rxUrl ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500'}`}>
              {rxUrl ? "✓ DOCUMENT VERIFIED" : "UPLOAD MEDICAL PDF/JPG"}
            </button>

            <div className="flex gap-4">
              <button onClick={() => setShowRxModal(false)} className="flex-1 font-bold text-slate-400 hover:text-slate-600 transition">Cancel</button>
              <button disabled={!rxUrl} onClick={submitOrder} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 disabled:opacity-30 disabled:shadow-none">Finish Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}