"use client";
import React, { useState, useEffect } from 'react';
import { Plane, Droplets, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

// Mock type for activities
type ActivityLog = {
  id: number;
  type: 'drone' | 'irrigation' | 'system';
  message: string;
  time: string;
};

export default function AgriDashboard() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // Simulate receiving data from the Rust Backend
  useEffect(() => {
    const initialLogs: ActivityLog[] = [
      { id: 1, type: 'system', message: 'Agri-Agent System Online', time: '10:00 AM' },
    ];
    setLogs(initialLogs);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 flex items-center gap-2">
            🧑‍🌾 Agri-Agent Dashboard
          </h1>
          <div className="flex gap-4">
            <StatusCard icon={<Activity size={18}/>} label="System" value="Running" color="text-emerald-600" />
            <StatusCard icon={<Plane size={18}/>} label="Drones" value="2 Active" color="text-blue-600" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Real-time Feed */}
          <section className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="text-emerald-600" /> Autonomous Activity Feed
            </h2>
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-3 rounded-lg bg-slate-50 border-l-4 border-emerald-500">
                  <span className="text-xs font-mono text-slate-400 mt-1">{log.time}</span>
                  <p className="text-slate-700">{log.message}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions / Alerts */}
          <section className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold mb-4 text-orange-600 flex items-center gap-2">
                <AlertTriangle size={20}/> Alerts
              </h2>
              <div className="p-3 bg-orange-50 text-orange-800 rounded-md text-sm">
                Zone 4: Nitrogen levels slightly below optimal.
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatusCard({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
      <span className={color}>{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
        <p className={`font-bold text-sm ${color}`}>{value}</p>
      </div>
    </div>
  );
}