"use client";
import React, { useState } from 'react';
import { 
  ShoppingCart, Upload, CheckCircle, Pill, 
  Download, Activity, Plus, Minus, Trash2 
} from 'lucide-react';
import { create } from 'zustand';

// --- Improved State Management (Zustand) ---
interface CartItem {
  id: number;
  name: string;
  price: number;
  isPrescriptionRequired: boolean;
  category: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
}

const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    const existingItem = state.items.find((i) => i.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),
  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map((i) =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
}));

export default function MedFlowStore() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const requiresRx = items.some(i => i.isPrescriptionRequired);
  const total = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const handleCheckout = () => {
    if (requiresRx) setIsModalOpen(true);
    else finalizeOrder();
  };

  const finalizeOrder = () => {
    setIsSuccess(true);
    clearCart();
  };

  const downloadInvoice = () => {
    window.open(`http://localhost:5000/api/invoice/ORD-${Math.floor(Math.random() * 10000)}`, '_blank');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Medical Catalog</h2>
          <p className="text-slate-500 text-sm">
            Active User: <span className="font-semibold text-sky-600">saadxsalman</span>
          </p>
        </div>
        <div className="hidden md:block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
            Verified Merchant
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 1, name: 'Amoxicillin 500mg', price: 45.0, isPrescriptionRequired: true, category: 'Antibiotics' },
            { id: 2, name: 'Paracetamol Forte', price: 12.5, isPrescriptionRequired: false, category: 'Pain Relief' },
            { id: 3, name: 'Stethoscope Pro V3', price: 89.9, isPrescriptionRequired: false, category: 'Diagnostics' },
            { id: 4, name: 'Insulin Pen Needle', price: 22.0, isPrescriptionRequired: true, category: 'Diabetes' },
          ].map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-sky-300 transition-all shadow-sm group">
              <div className="flex justify-between mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${p.isPrescriptionRequired ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {p.isPrescriptionRequired ? 'Rx Needed' : 'OTC'}
                </span>
                <Pill size={16} className="text-slate-300 group-hover:text-sky-500 transition" />
              </div>
              <p className="text-xs text-slate-400 mb-1">{p.category}</p>
              <h3 className="text-lg font-bold text-slate-800">{p.name}</h3>
              <p className="text-xl text-sky-600 mt-2 font-bold">${p.price.toFixed(2)}</p>
              <button 
                onClick={() => addItem(p)} 
                className="mt-6 w-full bg-slate-50 text-slate-900 py-3 rounded-xl font-bold hover:bg-sky-600 hover:text-white transition-colors border border-slate-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Cart / Checkout */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 h-fit shadow-xl sticky top-24">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b pb-4 text-slate-800">
            <ShoppingCart className="text-sky-600" size={20} /> Order Summary
          </h3>

          {isSuccess ? (
            <div className="text-center py-6 animate-in zoom-in duration-300">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-emerald-600" size={32} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Order Confirmed</h4>
              <button 
                onClick={downloadInvoice} 
                className="mt-6 w-full flex items-center justify-center gap-2 bg-sky-50 text-sky-600 py-3 rounded-xl font-bold text-sm hover:bg-sky-100 transition"
              >
                <Download size={18} /> Get Invoice
              </button>
              <button onClick={() => setIsSuccess(false)} className="mt-4 text-xs text-slate-400 underline block w-full">Back to Store</button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-sm">Cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{item.name}</span>
                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-slate-800 text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold text-sky-600">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout} 
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-4 hover:bg-black transition-all shadow-lg"
              >
                {requiresRx ? 'Upload Rx & Checkout' : 'Checkout Now'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Prescription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="bg-sky-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="text-sky-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Rx Required</h3>
              <p className="text-slate-500 text-sm mt-2">Professional verification is needed for these items.</p>
              
              <div className="mt-8 border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:border-sky-400 cursor-pointer transition-all group relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={() => { 
                    setUploading(true); 
                    setTimeout(() => { setUploading(false); setIsModalOpen(false); finalizeOrder(); }, 1500); 
                  }} 
                />
                <Upload className="mx-auto text-slate-300 group-hover:text-sky-500 transition mb-3" size={40} />
                <p className="text-sm font-bold text-slate-500">
                  {uploading ? 'Processing...' : 'Upload Prescription'}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="mt-8 text-slate-400 text-xs font-bold uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}