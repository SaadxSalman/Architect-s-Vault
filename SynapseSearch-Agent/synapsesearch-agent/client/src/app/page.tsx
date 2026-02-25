"use client";
import React, { useState } from 'react';
import { Search, Terminal, History, Code, Send, Cpu, BookOpen } from 'lucide-react';

export default function CognitiveDashboard() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to your Express server
    setTimeout(() => {
      setResponse({
        answer: "To handle authentication in Next.js (App Router), the best practice is using NextAuth.js or Clerk. Here is a basic configuration...",
        intent: "code_search",
        sources: ["/src/lib/auth.ts", "next-auth-docs.md"]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      {/* --- Sidebar: History --- */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <History size={18} className="text-blue-400" />
          <span className="font-semibold text-sm uppercase tracking-wider">Recents</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {["Auth Flow", "MongoDB Config", "Tailwind Setup"].map((item) => (
            <div key={item} className="p-2 text-sm hover:bg-slate-800 rounded cursor-pointer transition-colors truncate text-slate-400 hover:text-white">
              {item}
            </div>
          ))}
        </div>
      </aside>

      {/* --- Main Search Area --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-blue-500" />
            <h1 className="font-bold tracking-tight">SynapseSearch <span className="text-slate-500 font-normal">Agent</span></h1>
          </div>
          <div className="text-xs text-slate-500 font-mono">User: saadsalmanakram</div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {!response && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-500">
                <Terminal size={48} />
              </div>
              <h2 className="text-2xl font-bold">Ask anything about your codebase</h2>
              <p className="text-slate-500 max-w-md">Cognitive comprehension for JavaScript and TypeScript ecosystems.</p>
            </div>
          )}

          {/* AI Response Display */}
          {(isLoading || response) && (
            <div className="max-w-4xl mx-auto space-y-6">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                </div>
              ) : (
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-4 text-blue-400 text-xs font-mono uppercase">
                    <Code size={14} /> Result Found via {response.intent}
                  </div>
                  <p className="leading-relaxed mb-6 text-slate-300">{response.answer}</p>
                  <div className="flex gap-2">
                    {response.sources.map((src: string) => (
                      <span key={src} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 flex items-center gap-1">
                        <BookOpen size={10} /> {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Input Bar */}
        <div className="p-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl focus-within:border-blue-500 transition-all">
              <Search className="ml-4 text-slate-500" size={20} />
              <input 
                type="text"
                placeholder="Ex: How do I implement the Auth controller?"
                className="w-full bg-transparent p-4 outline-none text-white placeholder-slate-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="mr-4 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}