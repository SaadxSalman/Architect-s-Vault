"use client";
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

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
    } catch (e) { alert("Scrape error"); }
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
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-orange-500 font-black text-xl tracking-tighter">GEMINI RAG</h2>
          <p className="text-[10px] text-slate-500 font-mono">USER: saadxsalman</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Knowledge Bases</h3>
          <div className="space-y-2">
            {history.map(name => (
              <button
                key={name}
                onClick={() => setActiveCollection(name)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all border ${
                  activeCollection === name 
                  ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' 
                  : 'border-transparent text-slate-400 hover:bg-slate-800'
                }`}
              >
                # {name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-12 max-w-5xl mx-auto flex flex-col items-center">
        {/* URL Input */}
        <div className="w-full mb-10 p-1 bg-slate-900 border border-slate-800 rounded-2xl flex gap-1 shadow-2xl">
          <input 
            className="flex-1 bg-transparent px-6 py-3 outline-none text-sm"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
          />
          <button 
            onClick={handleScrape}
            disabled={scraping}
            className="bg-orange-600 hover:bg-orange-500 px-8 py-3 rounded-xl font-bold disabled:bg-slate-800 transition-all"
          >
            {scraping ? "..." : "Ingest"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full relative mb-8">
          <input 
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 text-lg outline-none focus:border-orange-500 transition-all"
            placeholder={activeCollection ? `Ask about ${activeCollection}...` : "Choose a collection first..."}
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
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* STRUCTURED OUTPUT AREA */}
        {result.answer && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-3xl">
              <div className="prose prose-invert max-w-none text-slate-200">
                <ReactMarkdown
                  components={{
                    h2: ({ ...props }) => <h2 className="text-2xl font-bold text-orange-500 mt-8 mb-4 border-b border-slate-800 pb-2" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-lg font-semibold text-orange-300 mt-6 mb-2" {...props} />,
                    p: ({ ...props }) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-300" {...props} />,
                    strong: ({ ...props }) => <strong className="text-white font-bold" {...props} />,
                  }}
                >
                  {result.answer}
                </ReactMarkdown>
              </div>

              {/* Sources Grid */}
              {result.sources.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-800">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Referenced Sources</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.sources.map((s, i) => (
                      <a 
                        key={i} 
                        href={s.properties.url} 
                        target="_blank" 
                        className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-orange-500/40 transition-all"
                      >
                        <p className="text-sm font-medium truncate text-slate-300">{s.properties.title}</p>
                        <span className="text-[10px] text-orange-500/70 font-mono">SOURCE_ID_{i+1} ↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}