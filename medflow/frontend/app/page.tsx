"use client";
import React, { useState } from 'react';
import { ShoppingCart, Upload, Package, CheckCircle, AlertTriangle, X, Pill, Download, Activity } from 'lucide-react';
import { create } from 'zustand';

// --- State Management ---
interface CartStore {
  items: any[];
  addItem: (item: any) => void;
  clearCart: () => void;
}

const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}));

export default function MedFlowApp() {
  const { items, addItem, clearCart } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const requiresRx = items.some(i => i.isPrescriptionRequired);
  const total = items.reduce((acc, curr) => acc + curr.price, 0);

  const handleCheckout = () => {
    if (requiresRx) setIsModalOpen(true);
    else finalizeOrder();
  };

  const finalizeOrder = () => {
    setIsSuccess(true);
    clearCart();
  };

  const downloadInvoice = () => {
    window.open(`http://localhost:5000/api/invoice/ORD-${Math.floor(Math.random()*1000)}`, '_blank');
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f8fafc]">
      <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">MedFlow Portal</h2>
          <p className="text-slate-500 text-sm">Active User: <span className="font-mono text-sky-600">saadxsalman</span></p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsAdmin(!isAdmin)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold hover:bg-slate-200 transition">
            {isAdmin ? 'Switch to Shop' : 'Admin Dashboard'}
          </button>
        </div>
      </div>

      {!isAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 1, name: 'Amoxicillin 500mg', price: 45.0, isPrescriptionRequired: true, stock: 12 },
              { id: 2, name: 'Paracetamol Forte', price: 12.5, isPrescriptionRequired: false, stock: 150 },
              { id: 3, name: 'Stethoscope Pro V3', price: 89.9, isPrescriptionRequired: false, stock: 4 },
            ].map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-sky-300 transition-all shadow-sm">
                <div className="flex justify-between mb-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${p.isPrescriptionRequired ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {p.isPrescriptionRequired ? 'Rx Needed' : 'OTC'}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-xl text-slate-400 mt-1 font-light">${p.price.toFixed(2)}</p>
                <button onClick={() => addItem(p)} className="mt-6 w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 h-fit shadow-xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b pb-4">
              <ShoppingCart className="text-sky-600" size={20} /> Checkout Summary
            </h3>
            {isSuccess ? (
              <div className="text-center py-6 animate-in zoom-in">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-emerald-600" />
                </div>
                <h4 className="font-bold">Payment Successful!</h4>
                <button onClick={downloadInvoice} className="mt-4 flex items-center gap-2 mx-auto text-sky-600 font-bold text-sm hover:underline">
                  <Download size={16} /> Download PDF Invoice
                </button>
                <button onClick={() => setIsSuccess(false)} className="mt-6 text-xs text-slate-400 underline block w-full text-center">New Order</button>
              </div>
            ) : items.length === 0 ? (
              <p className="text-slate-400 text-center py-10 text-sm">Your medical cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="font-bold">${item.price}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold text-sky-600">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-4">
                  {requiresRx ? 'Confirm & Upload Rx' : 'Checkout Now'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Rx Verification', 'Pharmacy Prep', 'Dispatched', 'Delivered'].map((stage, i) => (
            <div key={stage} className="bg-slate-50 p-4 rounded-2xl min-h-[500px] border-2 border-slate-100">
              <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-6">{stage}</h4>
              {i === 0 && (
                <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-sky-500">
                  <p className="text-sm font-bold">Order #MF-772</p>
                  <p className="text-[10px] text-slate-400 mb-4 uppercase">Prescription Pending Review</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-sky-50 text-sky-600 py-2 rounded text-[10px] font-bold">Approve</button>
                    <button className="flex-1 bg-red-50 text-red-600 py-2 rounded text-[10px] font-bold">Reject</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Prescription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="bg-sky-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="text-sky-600" size={32} />
              </div>
              <h3 className="text-xl font-bold">Upload Prescription</h3>
              <p className="text-slate-500 text-sm mt-2">Required for: Amoxicillin 500mg</p>
              
              <div className="mt-8 border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:border-sky-400 cursor-pointer transition group">
                <input type="file" className="hidden" id="rx" onChange={() => { setUploading(true); setTimeout(() => { setUploading(false); setIsModalOpen(false); finalizeOrder(); }, 1500); }} />
                <label htmlFor="rx" className="cursor-pointer">
                  <Upload className="mx-auto text-slate-300 group-hover:text-sky-500 transition mb-2" size={32} />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{uploading ? 'Processing...' : 'Upload PDF / Image'}</p>
                </label>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="mt-6 text-slate-400 text-xs font-bold uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}