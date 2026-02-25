'use client';
import { useState } from 'react';
import { trpc } from '@/utils/trpc';

export default function ResearchAssistant() {
  const [query, setQuery] = useState("");
  const { data, refetch, isFetching } = trpc.askQuestion.useQuery(
    { question: query },
    { enabled: false } // Only run on button click
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-2 mb-8">
        <input 
          className="flex-1 border p-2 rounded shadow-inner"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., What are the latest findings on protein folding?"
        />
        <button 
          onClick={() => refetch()}
          className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
        >
          {isFetching ? "Searching Papers..." : "Ask Bio-Lit"}
        </button>
      </div>

      {data && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500 shadow-sm">
            <h3 className="font-bold text-emerald-800 mb-2">Hypothesis / Answer</h3>
            <p className="text-slate-700 leading-relaxed">{data.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}