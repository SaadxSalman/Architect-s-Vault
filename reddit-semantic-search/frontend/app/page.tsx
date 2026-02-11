"use client";
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-8 min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Semantic Reddit Search
        </h1>
        <p className="text-slate-400 mt-2">Search r/movies using natural language</p>
      </header>

      <div className="flex gap-2 mb-8">
        <input 
          type="text"
          className="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-lg focus:ring-2 ring-orange-500 outline-none"
          placeholder="e.g., 'Movies that feel like a warm hug'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="grid gap-4">
        {results.map((post: any, i: number) => (
          <div key={i} className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition">
            <h3 className="text-xl font-bold text-orange-200 mb-2">{post.properties.title}</h3>
            <p className="text-slate-300 text-sm line-clamp-3 mb-4">{post.properties.content}</p>
            <div className="text-xs text-slate-500">Semantic Relevance Score: {post.metadata?.score?.toFixed(4)}</div>
          </div>
        ))}
      </div>
    </main>
  );
}