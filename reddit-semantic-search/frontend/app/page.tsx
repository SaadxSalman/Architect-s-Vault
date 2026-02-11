"use client";
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{answer: string, sources: any[]}>({answer: "", sources: []});

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3002/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-orange-500">Semantic Reddit Search</h1>
      <div className="w-full max-w-2xl flex gap-2">
        <input 
          className="flex-1 p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ring-orange-500"
          placeholder="e.g. Films that make me cry..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          className="bg-orange-600 px-6 py-3 rounded font-bold hover:bg-orange-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {result.answer && (
        <div className="mt-12 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
            <h2 className="text-xl font-bold mb-4 text-orange-400">AI Response:</h2>
            <p className="leading-relaxed">{result.answer}</p>
          </div>
          <h3 className="text-lg font-semibold mb-3">Top Sources Found:</h3>
          {result.sources.map((s, i) => (
            <div key={i} className="p-4 bg-slate-900 border-l-4 border-orange-500 mb-2">
              <p className="font-bold">{s.properties.title}</p>
              <a href={s.properties.url} className="text-xs text-blue-400 underline">View Thread</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}