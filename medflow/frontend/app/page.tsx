"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import PrescriptionModal from '@/components/PrescriptionModal';

export default function MedFlowStore() {
  const { items, clearCart } = useCart();
  
  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");

  // Product Data States
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const requiresRx = items.some(i => i.isPrescriptionRequired);
  const total = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckout = () => {
    if (requiresRx) setIsModalOpen(true);
    else finalizeOrder();
  };

  const finalizeOrder = async () => {
    const orderPayload = {
      items: items.map(i => `${i.name} (x${i.quantity})`).join(", "),
      total: total,
      hasRx: requiresRx
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await response.json();
      
      setLastOrderId(data.id);
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Make sure your backend server is running on port 5000");
    }
  };

  const handleRxUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setIsModalOpen(false);
      finalizeOrder();
    }, 1500);
  };

  const downloadInvoice = () => {
    if (lastOrderId) {
      window.open(`http://localhost:5000/api/invoice/${lastOrderId}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="my-8 flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Medical Catalog</h2>
          <p className="text-slate-500 text-sm">
            Active User: <span className="font-semibold text-sky-600">saadxsalman</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {loadingProducts ? (
            <div className="col-span-full py-20 text-center text-slate-400 animate-pulse font-medium">
              Loading Medical Catalog...
            </div>
          ) : (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>

        <CartSidebar 
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          lastOrderId={lastOrderId}
          downloadInvoice={downloadInvoice}
          handleCheckout={handleCheckout}
        />
      </div>

      {isModalOpen && (
        <PrescriptionModal 
          uploading={uploading} 
          onClose={() => setIsModalOpen(false)} 
          onUpload={handleRxUpload} 
        />
      )}
    </div>
  );
}