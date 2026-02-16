"use client";
import { useEffect, useState } from 'react';

interface Stats {
  total_repos: number;
  total_stars: number;
  avg_stars: number;
  top_repos: { name: string; stars: number }[];
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/github-stats/')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div className="flex h-screen items-center justify-center">Loading Analytics...</div>;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">GitHub Portfolio Health</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400">Total Repos</p>
          <p className="text-3xl font-mono">{stats.total_repos}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400">Total Stars</p>
          <p className="text-3xl font-mono text-yellow-400">{stats.total_stars}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400">Avg Stars</p>
          <p className="text-3xl font-mono">{stats.avg_stars}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Top Repositories</h2>
      <div className="space-y-4">
        {stats.top_repos.map((repo, i) => (
          <div key={i} className="flex justify-between items-center bg-slate-800 p-4 rounded-lg">
            <span className="font-medium">{repo.name}</span>
            <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">⭐ {repo.stars}</span>
          </div>
        ))}
      </div>
    </main>
  );
}