"use client"
import { useState, useEffect } from 'react'

interface Stats {
  total_repos: number;
  total_stars: number;
  avg_stars: number;
  top_repos: { name: string; stars: number }[];
}

export default function Dashboard() {
  const [data, setData] = useState<Stats | null>(null);

  useEffect(() => {
    // Replace with your Django API endpoint
    fetch('http://127.0.0.1:8000/api/github-stats/')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-10 text-center">Loading Analytics...</div>;

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <header className="mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-bold text-blue-400">GitHub Portfolio Health</h1>
        <p className="text-slate-400">Tracking activity for @saadxsalman</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Repos" value={data.total_repos} />
        <StatCard title="Total Stars" value={data.total_stars} />
        <StatCard title="Avg Stars" value={data.avg_stars.toFixed(2)} />
      </div>

      <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Top Performing Repositories</h2>
        <div className="space-y-4">
          {data.top_repos.map((repo) => (
            <div key={repo.name} className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
              <span className="font-mono text-blue-300">{repo.name}</span>
              <span className="text-yellow-500">⭐ {repo.stars}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string, value: any }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
      <h3 className="text-slate-500 text-sm uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}