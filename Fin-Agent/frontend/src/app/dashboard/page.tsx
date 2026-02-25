'use client';
import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import RiskGauge from '@/components/RiskGauge';
import ReportMarkdown from '@/components/ReportMarkdown';

export default function FinAgentDashboard() {
  const [ticker, setTicker] = useState('AAPL');
  const utils = trpc.useContext();
  
  // Multi-agent orchestration call
  const analysis = trpc.orchestrator.generateFullAnalysis.useMutation();

  const handleAnalyze = () => {
    analysis.mutate({ ticker });
  };

  return (
    <main className="min-h-screen bg-black text-slate-100 p-8">
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tighter">FIN-AGENT <span className="text-green-500">v1.0</span></h1>
        <div className="flex gap-4">
          <input 
            value={ticker} 
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg"
          />
          <button 
            onClick={handleAnalyze}
            disabled={analysis.isLoading}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition"
          >
            {analysis.isLoading ? 'Agents Working...' : 'Run Autonomous Analysis'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk & Modeling Column */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-sm uppercase text-slate-500 mb-4">Risk Management</h2>
            <RiskGauge value={analysis.data?.prediction ? 65 : 0} /> 
            <p className="mt-4 text-center text-slate-400">Model Confidence: 88%</p>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-sm uppercase text-slate-500 mb-2">Price Prediction</h2>
            <div className="text-4xl font-mono text-green-400">
              {analysis.data?.prediction ? `$${analysis.data.prediction}` : '---'}
            </div>
          </div>
        </div>

        {/* Reporting Column */}
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-2xl border border-slate-800 min-h-[600px]">
          <h2 className="text-sm uppercase text-slate-500 mb-6">Autonomous Report</h2>
          {analysis.data ? (
            <ReportMarkdown content={analysis.data.report} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-600">
              <p>Enter a ticker and run analysis to generate reports.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}