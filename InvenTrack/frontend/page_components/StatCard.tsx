import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  alert?: boolean;
}

export default function StatCard({ icon, label, value, subValue, alert }: StatCardProps) {
  return (
    <div className={`p-6 rounded-2xl bg-white border shadow-sm transition-transform hover:scale-[1.02] ${alert ? 'border-orange-200' : 'border-slate-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${alert ? 'bg-orange-50' : 'bg-slate-50'}`}>{icon}</div>
        {alert && <div className="animate-pulse w-2 h-2 rounded-full bg-orange-500" />}
      </div>
      <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
      <h2 className="text-3xl font-black tracking-tight">{value}</h2>
      {subValue && <p className="text-xs text-slate-400 mt-2">{subValue}</p>}
    </div>
  );
}