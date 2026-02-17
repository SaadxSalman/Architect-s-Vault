"use client";
import { useEffect, useState } from 'react';

interface Review {
  id: number;
  content: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  price: string;
  reviews: Review[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) setToken(savedToken);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/products/');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Updated Login with Alerts
  const handleLogin = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'password123' })
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.access);
        localStorage.setItem('accessToken', data.access);
        alert("Success! Welcome back, Saad.");
      } else {
        const errorMsg = res.status === 401 
          ? "Invalid username or password." 
          : res.status === 429 
          ? "Too many requests! Wait a moment." 
          : "Login failed.";
        alert(errorMsg);
      }
    } catch (err) {
      alert("Backend is offline. Check your Django terminal!");
    }
  };

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <nav className="flex flex-col sm:flex-row justify-between items-center mb-12 max-w-6xl mx-auto gap-4">
        <h1 className="text-3xl font-extrabold text-indigo-700 underline decoration-wavy">
          saadxsalman's Headless Store
        </h1>
        <div className="flex items-center gap-4">
          {token && (
            <button 
              onClick={() => { localStorage.removeItem('accessToken'); setToken(null); }}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          )}
          <button  
            onClick={handleLogin}
            className={`${token ? 'bg-green-500' : 'bg-indigo-600'} text-white px-6 py-2 rounded-full hover:opacity-90 transition shadow-md`}
          >
            {token ? "Logged In ✅" : "Login Demo"}
          </button>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="animate-pulse text-indigo-500 font-medium">Loading amazing products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? products.map(product => (
              <div key={product.id} className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 flex flex-col justify-between transform hover:scale-[1.02] transition-transform">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-slate-800">{product.name}</h2>
                  <p className="text-indigo-600 font-mono text-xl mb-6">${product.price}</p>
                  
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">Customer Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((r) => (
                        <div key={r.id} className="mb-3 border-b border-slate-200 last:border-0 pb-2">
                          <p className="text-slate-700 italic text-sm">"{r.content}"</p>
                          <div className="text-yellow-500 mt-1">
                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-sm">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center p-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500">The store is empty. Add products in the Django Admin!</p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}