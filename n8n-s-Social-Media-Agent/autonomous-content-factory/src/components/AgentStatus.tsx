"use client";
import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Search, PenTool, Share2 } from 'lucide-react';

export default function AgentStatus({ topic }: { topic: string }) {
  const [status, setStatus] = useState<'initializing' | 'draft' | 'scheduled' | 'published'>('initializing');

  useEffect(() => {
    if (!topic) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/status/${encodeURIComponent(topic)}`);
      const data = await res.json();
      setStatus(data.status);

      if (data.status === 'published') clearInterval(interval);
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [topic]);

  const steps = [
    { id: 'initializing', label: 'Researching', icon: Search },
    { id: 'draft', label: 'Drafting Content', icon: PenTool },
    { id: 'scheduled', label: 'Scheduling', icon: Share2 },
  ];

  return (
    <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Agent Workflow: {topic}</h3>
        {status !== 'published' && <Loader2 className="animate-spin text-blue-400" />}
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isDone = status === 'published' || (status === 'draft' && index === 0) || (status === 'scheduled' && index <= 1);
          const isCurrent = status === step.id;

          return (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${isDone ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                {isDone ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDone ? 'text-white' : 'text-slate-500'}`}>{step.label}</p>
                {isCurrent && <p className="text-xs text-blue-400 animate-pulse">Agent is working here...</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}