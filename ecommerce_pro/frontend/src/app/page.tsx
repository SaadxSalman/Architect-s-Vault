"use client";
import { useEffect, useState } from 'react';

interface Review { id: number; content: string; rating: number; }
interface Product { id: number; name: string; price: string; reviews: Review[]; }

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) setToken(savedToken);
    
    fetch('http://127.0.0.1:8000/api/products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const res = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.access);
        localStorage.setItem('accessToken', data.access);
        setShowLoginForm(false); // Hide form on success
        alert("Success! Welcome back, Saad.");
      } else {
        alert(data.detail || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      alert("Backend is offline!");
    }
  };

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <nav className="flex justify-between items-center mb-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-700 underline decoration-wavy">
          saadxsalman's Store
        </h1>
        
        {token ? (
          <div className="flex items-center gap-4">
            <span className="text-green-600 font-bold">Logged In ✅</span>
            <button onClick={() => {localStorage.clear(); setToken(null);}} className="text-red-500 text-sm underline">Logout</button>
          </div>
        ) : (
          <button 
            onClick={() => setShowLoginForm(!showLoginForm)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            {showLoginForm ? "Close Form" : "Login to Account"}
          </button>
        )}
      </nav>

      {/* Login Form Overlay */}
      {showLoginForm && !token && (
        <section className="max-w-md mx-auto mb-12 bg-white p-8 rounded-2xl shadow-2xl border border-indigo-100">
          <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Username" 
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700">
              Submit Login
            </button>
          </form>
        </section>
      )}

      {/* Product Display Area */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="col-span-full text-center animate-pulse">Loading products...</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-slate-800">{product.name}</h2>
                <p className="text-indigo-600 font-mono text-xl mb-4">${product.price}</p>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h3 className="text-xs uppercase font-bold text-slate-400 mb-2">Reviews</h3>
                  {product.reviews?.map(r => (
                    <p key={r.id} className="text-sm italic text-slate-600 border-b border-slate-100 py-1 last:border-0">
                      "{r.content}" — ⭐{r.rating}
                    </p>
                  )) || "No reviews."}
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}