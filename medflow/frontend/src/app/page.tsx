"use client";
import React, { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  isPrescriptionRequired: boolean;
};

export default function MedFlowApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showRxModal, setShowRxModal] = useState(false);

  // Fetch Data from Backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = () => {
    const needsRx = cart.some(item => item.isPrescriptionRequired);
    if (needsRx) {
      setShowRxModal(true);
    } else {
      alert("Proceeding to Lemon Squeezy Payment...");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Certified Medical Supplies</h2>
        <p className="text-gray-600">Secure. Verified. Professional.</p>
      </section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="border p-6 rounded-xl hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-xs px-2 py-1 rounded ${product.isPrescriptionRequired ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {product.isPrescriptionRequired ? 'Rx Required' : 'OTC'}
              </span>
              <span className="font-bold text-lg">${product.price}</span>
            </div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{product.category}</p>
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar/Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 bg-white border shadow-2xl p-6 rounded-2xl w-80">
          <h3 className="font-bold mb-4">Your Order ({cart.length})</h3>
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Prescription Modal */}
      {showRxModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Prescription Required</h2>
            <p className="mb-6 text-gray-600">One or more items in your cart require a valid doctor's prescription. Please upload it to continue.</p>
            <input type="file" className="block w-full border p-2 mb-4 rounded" />
            <div className="flex gap-4">
              <button onClick={() => setShowRxModal(false)} className="flex-1 border py-2 rounded">Cancel</button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded">Verify & Pay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}