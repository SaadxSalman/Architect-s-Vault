"use client";

import { useState } from 'react';
import { Search, Brain, FileText, Loader2, Sparkles } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; sources: string[] } | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F1A] text-slate-200 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4">
            <Brain className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            ALRIS <span className="text-blue-500 text-3xl">🔍</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Automated Local RAG Insight System. Explore your local data with semantic intelligence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="pl-5 text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ask your data anything..."
              className="w-full bg-transparent border-none py-5 px-4 text-white placeholder-slate-500 focus:ring-0 outline-none text-lg"
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {loading ? 'Thinking...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-12 flex flex-col items-center gap-4 animate-pulse">
            <div className="h-2 w-64 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-1/2 animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Processing with Snowflake & BART</p>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Synthesis</h3>
              </div>
              <p className="text-slate-200 text-lg leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-blue-400">
                {result.answer}
              </p>

              <hr className="my-6 border-slate-800" />

              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-3">
                  <FileText className="w-4 h-4" /> Supporting Sources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(result.sources)].map((source, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}