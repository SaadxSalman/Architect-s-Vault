"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [status, setStatus] = useState('Online');
  const [logs, setLogs] = useState<any[]>([]);

  // 1. Hardware Interaction (via Electron Bridge)
  const handlePrint = async () => {
    const result = await (window as any).electronAPI.printDocument('Invoice #123');
    console.log(result);
  };

  // 2. Real-time Supabase Subscription
  useEffect(() => {
    const channel = supabase
      .channel('inventory-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, 
        payload => setLogs(prev => [payload.new, ...prev]))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <main className="flex flex-col h-screen p-8 bg-slate-900 text-white">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">System Terminal</h1>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm font-medium uppercase">{status}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden">
        {/* Hardware Control Section */}
        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-slate-400">Hardware Interface</h2>
          <div className="flex flex-col gap-4">
            <button 
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 py-3 px-6 rounded-lg transition-all active:scale-95"
            >
              Print Receipt
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 py-3 px-6 rounded-lg transition-all">
              Trigger Scanner
            </button>
          </div>
        </section>

        {/* Real-time Inventory Feed */}
        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 text-slate-400">Real-time Inventory</h2>
          <div className="space-y-3 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="p-3 bg-slate-900 rounded border-l-4 border-blue-500">
                {log.item_name} - {log.status}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}