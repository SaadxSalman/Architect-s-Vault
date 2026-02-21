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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`).then(res => res.json()).then(setProducts);
    if (view === 'admin') fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`).then(res => res.json()).then(setOrders);
  }, [view]);

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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId: 'saadxsalman', 
        totalPrice: cart.reduce((a, b) => a + b.price, 0),
        prescriptionUrl: rxUrl 
      })
    });
    setCart([]);
    setShowRxModal(false);
    alert("Order Placed Successfully!");
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />

      {/* Navigation */}
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black text-blue-600 tracking-tighter">MEDFLOW</h1>
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button onClick={() => setView('store')} className={`px-8 py-2 rounded-xl text-sm font-bold transition ${view === 'store' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500'}`}>Pharmacy</button>
          <button onClick={() => setView('admin')} className={`px-8 py-2 rounded-xl text-sm font-bold transition ${view === 'admin' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500'}`}>Admin</button>
        </div>
      </nav>

      {view === 'store' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="p-8 border rounded-[3rem] bg-white hover:shadow-2xl transition-all border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{p.category}</span>
              <h3 className="text-2xl font-bold mt-4">{p.name}</h3>
              <p className="text-3xl font-black mt-6">${p.price}</p>
              <button onClick={() => setCart([...cart, p])} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition">Add to Cart</button>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="fixed bottom-10 right-10 bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl w-80">
                <div className="flex justify-between mb-4 border-b border-white/10 pb-4">
                    <span className="text-slate-400">Total</span>
                    <span className="font-black text-xl">${cart.reduce((a, b) => a + b.price, 0).toFixed(2)}</span>
                </div>
                <button onClick={() => cart.some(p => p.isPrescriptionRequired) ? setShowRxModal(true) : submitOrder()} className="w-full bg-blue-500 py-4 rounded-2xl font-bold">Secure Checkout</button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide">
          {['PENDING', 'PAID', 'SHIPPED'].map(status => (
            <div key={status} className="min-w-[350px] bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200">
              <h2 className="text-xs font-black text-slate-400 mb-8 tracking-[0.3em] uppercase px-2">{status}</h2>
              {orders.filter(o => o.status === status).map(o => (
                <div key={o.id} className="bg-white p-6 rounded-3xl shadow-sm mb-4 border border-slate-100">
                  <p className="text-xs font-mono text-slate-300 mb-2">#{o.id.slice(-8)}</p>
                  <p className="text-2xl font-black">${o.totalPrice}</p>
                  <div className="mt-6 flex flex-col gap-2">
                    <button onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${o.id}/invoice`)} className="text-[10px] font-bold bg-slate-50 py-2 rounded-xl">📄 GET INVOICE</button>
                    {status === 'PENDING' && <button onClick={() => updateStatus(o.id, 'PAID')} className="text-[10px] font-bold bg-blue-50 text-blue-600 py-2 rounded-xl">VERIFY PAY</button>}
                    {status === 'PAID' && <button onClick={() => updateStatus(o.id, 'SHIPPED')} className="text-[10px] font-bold bg-emerald-50 text-emerald-600 py-2 rounded-xl">SHIP ORDER</button>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Prescription Modal */}
      {showRxModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white p-10 rounded-[3.5rem] max-w-md w-full shadow-2xl">
            <h2 className="text-3xl font-black mb-4">Verification</h2>
            <p className="text-slate-500 text-sm mb-8">One or more items require a prescription. Please upload your document via Cloudinary.</p>
            <button onClick={openCloudinary} className={`w-full py-8 border-2 border-dashed rounded-3xl mb-8 font-bold transition ${rxUrl ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-slate-200 text-slate-400'}`}>
              {rxUrl ? "✅ DOCUMENT READY" : "📁 UPLOAD PRESCRIPTION"}
            </button>
            <div className="flex gap-4">
              <button onClick={() => setShowRxModal(false)} className="flex-1 font-bold text-slate-400">Cancel</button>
              <button disabled={!rxUrl} onClick={submitOrder} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold disabled:opacity-30">Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}