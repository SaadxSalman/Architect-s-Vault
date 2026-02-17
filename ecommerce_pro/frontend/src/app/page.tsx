"use client";
import { useEffect, useState } from 'react';
import { Product, Order, CartItem } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import Footer from '@/components/Footer';
import AuthModal from '@/auth/AuthModal';
import ProductDetailsModal from '@/components/ProductDetailsModal';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
      setToken(savedToken);
      fetchOrders(savedToken);
    }
    
    fetch('http://127.0.0.1:8000/api/products/')
      .then(res => res.json())
      .then(data => { 
        setProducts(data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  const fetchOrders = async (authToken: string) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/orders/', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders");
    }
  };

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);
    setShowAuthModal(false);
    fetchOrders(newToken);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setOrders([]);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const removeItemCompletely = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const placeOrder = async () => {
    if (!token) return alert("Please login first!");
    if (cart.length === 0) return alert("Your cart is empty!");

    const totalPrice = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
    const productNames = cart.map(item => `${item.name} (x${item.quantity})`).join(", ");

    try {
      const res = await fetch('http://127.0.0.1:8000/api/orders/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ product_names: productNames, total_price: totalPrice.toFixed(2) })
      });

      if (res.ok) {
        alert("Order Placed! 🚀");
        setCart([]);
        fetchOrders(token);
      }
    } catch (err) {
      alert("Error placing order.");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        token={token} 
        onLogout={handleLogout} 
        onShowAuth={() => setShowAuthModal(true)} 
      />

      <main className="flex-grow max-w-6xl mx-auto p-6 w-full">
        {/* Search Bar */}
        <div className="relative mb-10 max-w-xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder="Search gear..." 
            className="w-full p-4 pl-12 rounded-2xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all"
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <section className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {searchQuery ? `Results for "${searchQuery}"` : "Featured Inventory"}
            </h2>
            
            {loading ? (
              <div className="flex justify-center p-20"><p className="animate-pulse text-indigo-500 font-bold">Loading vault...</p></div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onSelect={setSelectedProduct} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-400 italic">No products match your search.</p>
              </div>
            )}
          </section>

          <CartSidebar 
            cart={cart} 
            onRemove={removeItemCompletely} 
            onDecrease={decreaseQuantity} 
            onIncrease={addToCart} 
            onCheckout={placeOrder} 
          />
        </div>

        {/* Order History */}
        {token && orders.length > 0 && (
          <section className="mt-12 mb-20">
            <h2 className="text-2xl font-bold mb-6 text-slate-400 italic">Your Vault History</h2>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="p-5">Order ID</th>
                    <th className="p-5">Items</th>
                    <th className="p-5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-indigo-50/20 transition">
                      <td className="p-5 text-indigo-400 font-mono font-bold">#{o.id}</td>
                      <td className="p-5 text-slate-700 text-sm font-medium">{o.product_names}</td>
                      <td className="p-5 text-right font-black text-green-600">${o.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <ProductDetailsModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
      />

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={handleLoginSuccess} 
        />
      )}
    </div>
  );
}