'use client';
import { trpc } from '@/utils/trpc';

export const DiscoveryTool = () => {
  const mutation = trpc.findBridges.useMutation();

  return (
    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Discovery Engine 🛰️</h2>
      <div className="flex gap-4 mb-8">
        <input placeholder="Domain A (e.g. CRISPR)" className="bg-slate-800 border-slate-700 rounded p-2 flex-1" />
        <span className="self-center text-cyan-500 font-bold">×</span>
        <input placeholder="Domain B (e.g. Data Privacy)" className="bg-slate-800 border-slate-700 rounded p-2 flex-1" />
      </div>
      
      <button 
        onClick={() => mutation.mutate({ topicA: "CRISPR", topicB: "Data Privacy" })}
        className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg font-bold transition"
      >
        Calculate Hidden Intersections
      </button>

      {mutation.data && (
        <div className="mt-8 p-4 bg-slate-800 border border-cyan-900 rounded-lg">
          <h3 className="text-cyan-400 font-semibold mb-2">New Hypothesis:</h3>
          <p className="italic text-slate-300">"{mutation.data.hypothesis}"</p>
        </div>
      )}
    </div>
  );
};