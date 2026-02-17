"use client";
import { useEffect, useState } from 'react';
import { Product, Order, CartItem } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import Footer from '@/components/Footer';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLoginMode ? 'token/' : 'register/';
    const body = isLoginMode ? { username, password } : { username, password, email };

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok) {
        if (isLoginMode) {
          setToken(data.access);
          localStorage.setItem('accessToken', data.access);
          setShowAuthModal(false);
          fetchOrders(data.access);
        } else {
          alert("Success! Now please login.");
          setIsLoginMode(true);
        }
      } else { 
        alert(JSON.stringify(data)); 
      }
    } catch (err) {
      alert("Server error connecting to backend.");
    }
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
        onLogout={() => { localStorage.clear(); setToken(null); setOrders([]); }} 
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

      {/* --- MODAL: PRODUCT DETAILS --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-[60] p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-full bg-slate-200">
                <img src={selectedProduct.image_url} className="w-full h-full object-cover" alt={selectedProduct.name} />
              </div>
              <div className="p-8 flex flex-col">
                <button onClick={() => setSelectedProduct(null)} className="self-end text-slate-400 hover:text-slate-900 font-bold transition">✕ Close</button>
                <h2 className="text-3xl font-black text-slate-800 mt-4">{selectedProduct.name}</h2>
                <p className="text-indigo-600 text-3xl font-mono font-black mt-2">${selectedProduct.price}</p>
                <div className="mt-8 bg-slate-50 p-4 rounded-2xl flex-grow overflow-y-auto max-h-48">
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Customer Reviews</h4>
                  {selectedProduct.reviews?.length > 0 ? (
                    selectedProduct.reviews.map(r => (
                      <p key={r.id} className="text-sm italic text-slate-600 mb-3 border-l-4 border-indigo-200 pl-3">
                        "{r.content}" — <span className="text-amber-500">⭐{r.rating}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 italic">No reviews for this item yet.</p>
                  )}
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:bg-indigo-700 transition active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: AUTH --- */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <form onSubmit={handleAuth} className="bg-white p-8 rounded-[2rem] w-full max-w-sm shadow-2xl transform transition-all">
            <h2 className="text-3xl font-black text-center mb-2 text-slate-800">{isLoginMode ? 'Login' : 'Join Us'}</h2>
            <p className="text-slate-500 text-center mb-6 text-sm">{isLoginMode ? 'Welcome back to your vault' : 'Create an account to start shopping'}</p>
            <div className="space-y-4">
              {!isLoginMode && (
                <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" value={email} onChange={e => setEmail(e.target.value)} required />
              )}
              <input type="text" placeholder="Username" className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" value={username} onChange={e => setUsername(e.target.value)} required />
              <input type="password" placeholder="Password" className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" value={password} onChange={e => setPassword(e.target.value)} required />
              <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:bg-indigo-700 transition mt-4">{isLoginMode ? 'Sign In' : 'Register Now'}</button>
            </div>
            <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="w-full mt-6 text-indigo-600 font-bold text-sm hover:underline">{isLoginMode ? "Need an account? Register" : "Already a member? Login"}</button>
            <button type="button" onClick={() => setShowAuthModal(false)} className="w-full mt-3 text-slate-400 text-xs font-semibold hover:text-slate-600">Maybe later</button>
          </form>
        </div>
      )}
    </div>
  );
}