"use client";
import { useEffect, useState } from 'react';

// --- Interfaces ---
interface Review { id: number; content: string; rating: number; }
interface Product { 
  id: number; 
  name: string; 
  price: string; 
  image_url: string; 
  reviews: Review[]; 
}
interface Order { id: number; product_names: string; total_price: string; created_at: string; }

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // UI & Form states
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
    const res = await fetch('http://127.0.0.1:8000/api/orders/', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
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
          alert("Welcome back!");
        } else {
          alert("Registration successful! You can now login.");
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
    setCart([...cart, product]);
  };

  const placeOrder = async () => {
    if (!token) return alert("Please login to checkout!");
    if (cart.length === 0) return alert("Your cart is empty!");
    
    const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    const productNames = cart.map(item => item.name).join(", ");

    const res = await fetch('http://127.0.0.1:8000/api/orders/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ product_names: productNames, total_price: totalPrice })
    });

    if (res.ok) {
      alert("Order Successful! 🎉");
      setCart([]);
      fetchOrders(token); 
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="bg-white/80 border-b sticky top-0 z-50 p-4 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">SAAD.VAULT</h1>
          <div className="flex gap-4 items-center">
            {token ? (
              <button 
                onClick={() => {localStorage.clear(); setToken(null); setOrders([]);}} 
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search Bar Section */}
        <div className="mb-10 max-w-2xl">
          <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Search Catalog</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type to find gear (e.g. Keyboard, Monitor...)" 
              className="w-full p-5 pl-14 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product Catalog */}
          <section className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-8 text-slate-800">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Gear"}
            </h2>
            
            {loading ? (
              <div className="flex justify-center p-20"><p className="animate-pulse text-indigo-500">Scanning inventory...</p></div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                    <div className="h-56 w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
                        <p className="text-indigo-600 font-mono text-2xl font-black">${product.price}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="mt-auto w-full bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-400 italic">No products match your search. Try a different keyword!</p>
              </div>
            )}
          </section>

          {/* Sidebar Cart */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-indigo-100 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">🛒 Cart <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs">{cart.length}</span></h2>
              {cart.length === 0 ? <p className="text-slate-400 text-sm italic py-4">Your cart is empty</p> : (
                <>
                  <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="font-medium truncate mr-2 text-slate-700">{item.name}</span>
                        <span className="font-bold text-indigo-600">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-dashed pt-4">
                    <div className="flex justify-between font-black text-xl mb-4 text-slate-800">
                      <span>Total:</span>
                      <span>${cart.reduce((a, b) => a + parseFloat(b.price), 0).toFixed(2)}</span>
                    </div>
                    <button onClick={placeOrder} className="w-full bg-green-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-green-200 hover:bg-green-600 transition-all hover:-translate-y-1">
                      PLACE ORDER
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>

        {/* Order History Section */}
        {token && (
          <section className="mt-12 pb-20">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
               My Order History
            </h2>
            {orders.length > 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="p-5 text-xs uppercase font-black">ID</th>
                      <th className="p-5 text-xs uppercase font-black">Products Purchased</th>
                      <th className="p-5 text-xs uppercase font-black text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="p-5 font-mono text-indigo-600">#{order.id}</td>
                        <td className="p-5 text-slate-700 font-medium">{order.product_names}</td>
                        <td className="p-5 font-black text-right text-green-600">${order.total_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-300 text-center">
                <p className="text-slate-400">No orders found yet. Time to go shopping!</p>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Auth Modal (Login/Register) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-[100] p-4">
          <form onSubmit={handleAuth} className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-sm transform transition-all">
            <h2 className="text-3xl font-black mb-2 text-center text-slate-800">
              {isLoginMode ? 'Login' : 'Join Us'}
            </h2>
            <p className="text-slate-500 text-center mb-8 text-sm">
              {isLoginMode ? 'Access your vault and orders' : 'Create your account to start collecting'}
            </p>
            
            <div className="space-y-4">
              {!isLoginMode && (
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              )}
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full p-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
              />
              <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-indigo-200 transition-all mt-4 active:scale-95">
                {isLoginMode ? 'Sign In' : 'Register Now'}
              </button>
            </div>
            
            <button 
              type="button" 
              onClick={() => setIsLoginMode(!isLoginMode)} 
              className="w-full mt-6 text-indigo-600 font-bold text-sm hover:underline"
            >
              {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
            
            <button 
              type="button" 
              onClick={() => setShowAuthModal(false)} 
              className="w-full mt-2 text-slate-400 text-xs font-semibold hover:text-slate-600 transition"
            >
              Maybe later
            </button>
          </form>
        </div>
      )}
    </main>
  );
}