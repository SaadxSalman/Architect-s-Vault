"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [targetUrl, setTargetUrl] = useState("https://www.reddit.com/r/technology/hot.json");
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<{answer: string, sources: any[]}>({answer: "", sources: []});

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await fetch('http://localhost:3002/collections');
    const data = await res.json();
    setHistory(data.collections || []);
  };

  const handleScrape = async () => {
    setScraping(true);
    try {
      const res = await fetch('http://localhost:3002/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });
      const data = await res.json();
      if (data.collectionName) {
        setActiveCollection(data.collectionName);
        loadHistory();
      }
      alert(data.message);
    } catch (e) {
      alert("Error scraping link.");
    }
    setScraping(false);
  };

  const handleSearch = async () => {
    if (!activeCollection || !query) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3002/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, collectionName: activeCollection })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error("Search error", e);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500/30">
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900/80 border-r border-slate-800 p-6 flex flex-col gap-6 backdrop-blur-md">
        <div>
          <h2 className="text-orange-500 font-black text-xl tracking-tighter mb-1">GEMINI RAG</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">User: saadxsalman</p>
        </div>

        <div className="flex-1">
          <h3 className="text-xs font-semibold text-slate-500 uppercase mb-4 tracking-widest">Collections</h3>
          <div className="space-y-2">
            {history.map(name => (
              <button
                key={name}
                onClick={() => setActiveCollection(name)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeCollection === name 
                  ? 'bg-orange-500/10 border-orange-500/50 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                  : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-12 flex flex-col items-center max-w-5xl mx-auto">
        {/* Header/Scraper */}
        <section className="w-full mb-12">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-2xl flex gap-1 shadow-2xl">
            <input 
              className="flex-1 bg-transparent px-6 py-3 outline-none text-sm placeholder:text-slate-600"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="Paste any .json URL here..."
            />
            <button 
              onClick={handleScrape}
              disabled={scraping}
              className="bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-all"
            >
              {scraping ? "Processing..." : "Ingest JSON"}
            </button>
          </div>
        </section>

        {/* Chat/Search Area */}
        <section className="w-full flex flex-col gap-6">
          <div className="relative">
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 text-lg outline-none focus:border-orange-500 transition-colors shadow-inner"
              placeholder={activeCollection ? `Ask ${activeCollection}...` : "Select a collection from history to start..."}
              value={query}
              disabled={!activeCollection}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              disabled={loading || !activeCollection}
              className="absolute right-4 top-4 bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-slate-200 disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Search"}
            </button>
          </div>

          {/* AI Response Box */}
          {result.answer && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm">
                <h4 className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-4">Response</h4>
                <p className="text-xl text-slate-200 leading-relaxed font-light">{result.answer}</p>
                
                {result.sources.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-slate-800">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-4">Cited Sources</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.sources.map((s, i) => (
                        <a 
                          key={i} 
                          href={s.properties.url} 
                          target="_blank" 
                          className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-orange-500/50 transition-colors group"
                        >
                          <p className="text-sm font-semibold truncate text-slate-300 group-hover:text-orange-400">{s.properties.title}</p>
                          <span className="text-[10px] text-slate-600 uppercase">View Source ↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}