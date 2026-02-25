'use client';
import { useState } from 'react';
import StorefrontGrid from '@/components/StorefrontGrid';

export default function Home() {
  const [socialBio, setSocialBio] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateStore = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/generate-storefront', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ socialText: socialBio }),
    });
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Retail-GPT 🛍️</h1>
        <textarea 
          className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your social media bio or style preferences here..."
          value={socialBio}
          onChange={(e) => setSocialBio(e.target.value)}
        />
        <button 
          onClick={generateStore}
          className="mt-4 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? 'Analyzing your style...' : 'Generate My Storefront'}
        </button>
      </div>

      {data && <StorefrontGrid data={data} />}
    </main>
  );
}