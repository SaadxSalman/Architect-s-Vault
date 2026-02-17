"use client";
import { useEffect, useState } from 'react';

// --- Interfaces ---
interface Review { 
  id: number; 
  content: string; 
  rating: number; 
}

interface Product { 
  id: number; 
  name: string; 
  price: string; 
  image_url: string; 
  reviews: Review[]; 
}

// Interface to handle quantities in the cart
interface CartItem extends Product {
  quantity: number;
}

interface Order { 
  id: number; 
  product_names: string; 
  total_price: string; 
  created_at: string; 
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  // --- Manage Cart Logic ---
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

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Navbar --- */}
      <nav className="bg-white/80 border-b sticky top-0 z-40 p-4 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">SAAD.VAULT</h1>
          <div className="flex gap-4 items-center">
            {token ? (
              <button 
                onClick={() => { localStorage.clear(); setToken(null); setOrders([]); }} 
                className="text-red-500 font-bold hover:underline text-sm"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition text-sm"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* --- Search Bar --- */}
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
          {/* --- Product Grid --- */}
          <section className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {searchQuery ? `Results for "${searchQuery}"` : "Featured Inventory"}
            </h2>
            
            {loading ? (
              <div className="flex justify-center p-20"><p className="animate-pulse text-indigo-500 font-bold">Loading vault...</p></div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300">
                    <div 
                      className="h-52 bg-slate-100 cursor-pointer overflow-hidden" 
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img 
                        src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                        alt={product.name}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-slate-800">{product.name}</h3>
                      <p className="text-indigo-600 font-black text-2xl mb-4">${product.price}</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedProduct(product)} 
                          className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition"
                        >
                          Details
                        </button>
                        <button 
                          onClick={() => addToCart(product)} 
                          className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-400 italic">No products match your search.</p>
              </div>
            )}
          </section>

          {/* --- Cart Sidebar --- */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-indigo-50 sticky top-24 shadow-lg">
              <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-slate-800">
                🛒 Cart <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs">{totalItemsInCart}</span>
              </h2>
              {cart.length === 0 ? (
                <p className="text-slate-400 text-sm italic py-4">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-80 overflow-y-auto mb-4 pr-1 custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.id} className="group flex flex-col py-3 border-b border-slate-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-col truncate pr-2">
                            <span className="truncate text-slate-800 font-bold">{item.name}</span>
                            <span className="font-medium text-indigo-600 text-xs">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={() => removeItemCompletely(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors text-xs"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-slate-100 rounded-lg p-1">
                            <button 
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-bold text-slate-700 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => addToCart(item)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:bg-green-50 hover:text-green-600 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-dashed">
                    <p className="text-xl font-black mb-4 text-slate-800">
                      Total: ${cart.reduce((a, b) => a + (parseFloat(b.price) * b.quantity), 0).toFixed(2)}
                    </p>
                    <button 
                      onClick={placeOrder} 
                      className="w-full bg-green-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-green-100 hover:bg-green-600 transition active:scale-95"
                    >
                      CHECKOUT
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

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
                <input 
                  type="email" placeholder="Email Address" 
                  className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                  value={email} onChange={e => setEmail(e.target.value)} required 
                />
              )}
              <input 
                type="text" placeholder="Username" 
                className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                value={username} onChange={e => setUsername(e.target.value)} required 
              />
              <input 
                type="password" placeholder="Password" 
                className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                value={password} onChange={e => setPassword(e.target.value)} required 
              />
              <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:bg-indigo-700 transition mt-4">
                {isLoginMode ? 'Sign In' : 'Register Now'}
              </button>
            </div>
            
            <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="w-full mt-6 text-indigo-600 font-bold text-sm hover:underline">
              {isLoginMode ? "Need an account? Register" : "Already a member? Login"}
            </button>
            <button type="button" onClick={() => setShowAuthModal(false)} className="w-full mt-3 text-slate-400 text-xs font-semibold hover:text-slate-600">Maybe later</button>
          </form>
        </div>
      )}

      {/* --- ORDER HISTORY --- */}
      {token && orders.length > 0 && (
        <section className="max-w-6xl mx-auto p-6 mt-12 mb-20">
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
  );
}