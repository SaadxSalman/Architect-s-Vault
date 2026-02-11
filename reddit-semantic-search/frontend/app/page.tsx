"use client";
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [targetUrl, setTargetUrl] = useState("https://www.reddit.com/r/movies/top.json?t=all");
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [result, setResult] = useState<{answer: string, sources: any[]}>({answer: "", sources: []});

  const handleScrape = async () => {
    setScraping(true);
    try {
      const res = await fetch('http://localhost:3002/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });
      const data = await res.json();
      alert(data.message || "Scraping complete!");
    } catch (error) {
      console.error("Scrape failed", error);
    }
    setScraping(false);
  };

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
    <main className="min-h-screen p-8 flex flex-col items-center bg-slate-950 text-white">
      <h1 className="text-4xl font-bold mb-8 text-orange-500">Dynamic Semantic Search</h1>
      
      {/* Scrape Section */}
      <div className="w-full max-w-2xl mb-8 p-4 bg-slate-900 rounded-lg border border-slate-700">
        <label className="block text-sm font-medium mb-2 text-slate-400">Target JSON URL (e.g. Reddit .json)</label>
        <div className="flex gap-2">
          <input 
            className="flex-1 p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ring-orange-500"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
          />
          <button 
            onClick={handleScrape}
            disabled={scraping}
            className="bg-blue-600 px-6 py-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {scraping ? "Scraping..." : "Scrape"}
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-2xl flex gap-2">
        <input 
          className="flex-1 p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ring-orange-500"
          placeholder="Ask a question about the scraped data..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
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
              <p className="font-bold text-slate-100">{s.properties.title}</p>
              <a href={s.properties.url} target="_blank" className="text-xs text-blue-400 underline">View Link</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}