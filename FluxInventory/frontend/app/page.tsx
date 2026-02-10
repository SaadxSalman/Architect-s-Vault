"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { trpc } from "./layout";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [status, setStatus] = useState<any>(null);
  const [dbData, setDbData] = useState<any[]>([]);

  useEffect(() => {
    // 1. Fetch from Local Backend (tRPC over IPC)
    trpc.getHardwareStatus.query().then(setStatus);

    // 2. Fetch from Supabase (Cloud)
    supabase.from("inventory").select("*").then(({ data }) => setDbData(data || []));
  }, []);

  const handleAction = async () => {
    // Heavy lifting handled by backend via tRPC
    await trpc.saveLocalLog.mutate("Transaction started...");
    alert("Local log saved via Node.js Main Process!");
  };

  return (
    <main className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Hardware Section */}
        <section className="p-6 bg-slate-800 rounded-lg shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-green-400">Local System (Main Process)</h2>
          <pre className="bg-black p-4 rounded text-xs">
            {JSON.stringify(status, null, 2)}
          </pre>
          <button 
            onClick={handleAction}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium transition"
          >
            Trigger Local Action
          </button>
        </section>

        {/* Supabase Section */}
        <section className="p-6 bg-slate-800 rounded-lg shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-purple-400">Cloud Data (Supabase)</h2>
          <div className="space-y-2">
            {dbData.length > 0 ? dbData.map(item => (
              <div key={item.id} className="p-2 bg-slate-700 rounded border border-slate-600">
                {item.name} - Qty: {item.quantity}
              </div>
            )) : <p className="text-slate-400">No cloud data found.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}