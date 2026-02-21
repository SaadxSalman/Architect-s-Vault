"use client";
import React, { useState, useEffect } from 'react';

type Product = {
  id: string; name: string; category: string; price: number; isPrescriptionRequired: boolean;
};

type Order = {
  id: string; status: string; totalPrice: number; prescriptionUrl?: string; createdAt: string;
};

export default function MedFlowApp() {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showRxModal, setShowRxModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`).then(res => res.json()).then(setProducts);
    if (view === 'admin') {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`).then(res => res.json()).then(setOrders);
    }
  }, [view]);

  // --- STORE LOGIC ---
  const handleCheckout = async () => {
    const needsRx = cart.some(p => p.isPrescriptionRequired);
    if (needsRx) return setShowRxModal(true);

    const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, userId: 'saadxsalman', totalPrice: cart.reduce((a, b) => a + b.price, 0) })
    });
    const order = await orderRes.json();
    
    // Lemon Squeezy Redirect
    const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId: 'YOUR_LS_VARIANT_ID', userEmail: 'user@example.com', orderId: order.id })
    });
    const { url } = await checkRes.json();
    window.location.href = url;
  };

  // --- ADMIN KANBAN LOGIC ---
  const updateStatus = async (id: string, newStatus: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="p-6">
      {/* Navigation Toggle */}
      <div className="flex gap-4 mb-8 bg-slate-100 p-1 w-fit rounded-lg">
        <button onClick={() => setView('store')} className={`px-4 py-2 rounded-md ${view === 'store' ? 'bg-white shadow' : ''}`}>Storefront</button>
        <button onClick={() => setView('admin')} className={`px-4 py-2 rounded-md ${view === 'admin' ? 'bg-white shadow' : ''}`}>Admin Kanban</button>
      </div>

      {view === 'store' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="border p-4 rounded-xl shadow-sm">
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-blue-600 font-mono">${p.price}</p>
              <button 
                onClick={() => setCart([...cart, p])}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
              >Add to Cart</button>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="fixed bottom-6 right-6 bg-white border p-6 rounded-2xl shadow-xl w-72">
              <p className="font-bold mb-2">Total: ${cart.reduce((a, b) => a + b.price, 0)}</p>
              <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-2 rounded-lg font-bold">Checkout with LS</button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[80vh]">
          {/* Kanban Columns */}
          {['PENDING', 'PAID', 'SHIPPED'].map(status => (
            <div key={status} className="bg-slate-50 p-4 rounded-xl border-t-4 border-blue-500">
              <h2 className="font-bold text-slate-500 mb-4">{status}</h2>
              <div className="space-y-3">
                {orders.filter(o => o.status === status).map(o => (
                  <div key={o.id} className="bg-white p-3 rounded border shadow-sm text-sm">
                    <p className="font-bold">Order #{o.id.slice(-5)}</p>
                    <p className="text-gray-500">${o.totalPrice}</p>
                    <div className="mt-3 flex gap-2">
                      {status === 'PENDING' && <button onClick={() => updateStatus(o.id, 'PAID')} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded">Verify Pay</button>}
                      {status === 'PAID' && <button onClick={() => updateStatus(o.id, 'SHIPPED')} className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded">Ship Item</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rx Modal */}
      {showRxModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Prescription Required</h2>
            <p className="text-gray-500 text-sm mb-4">You are purchasing "Rx Only" medication. Please upload your medical certificate.</p>
            <input type="file" className="text-xs mb-4 w-full" />
            <div className="flex gap-2">
              <button onClick={() => setShowRxModal(false)} className="flex-1 py-2 border rounded-lg">Close</button>
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg">Upload & Pay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}