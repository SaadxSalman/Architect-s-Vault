'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold mb-2">API Control Center</h2>
        <p className="text-slate-400">Testing Multi-Strategy Authentication with tRPC & Supabase</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Auth Strategy Cards */}
        <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
          <h3 className="text-orange-400 font-mono mb-2">Basic Auth</h3>
          <p className="text-xs text-slate-400 mb-4">Used for /admin/system-health</p>
          <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded">Test Admin</button>
        </div>

        <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
          <h3 className="text-green-400 font-mono mb-2">API Keys</h3>
          <p className="text-xs text-slate-400 mb-4">Used for /public/metrics</p>
          <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded">Fetch Metrics</button>
        </div>

        <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
          <h3 className="text-blue-400 font-mono mb-2">JWT (Bearer)</h3>
          <p className="text-xs text-slate-400 mb-4">Standard User Task Management</p>
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded">View Tasks</button>
        </div>
      </div>

      <section className="mt-12 bg-black/30 p-6 rounded-lg border border-slate-800">
        <h3 className="text-lg mb-4">Response Preview (Postman Mocking)</h3>
        <pre className="text-sm text-pink-400">
          {`{ "status": 200, "message": "Select an action to see tRPC response" }`}
        </pre>
      </section>
    </main>
  );
}