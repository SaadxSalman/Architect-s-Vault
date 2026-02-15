"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Mocking the DRF fetch for saadxsalman
    const load = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setData({ score: 742, repos: 15, top: [{name: "project-x", stars: 50}] });
    };
    load();
  }, []);

  return (
    <main className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold border-b border-gray-800 pb-4 mb-8">
        GitHub Health: <span className="text-blue-500">saadxsalman</span>
      </h1>
      
      {!data ? <p className="animate-pulse">Analyzing Repositories...</p> : (
        <div className="grid gap-6">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-gray-400">Aggregated Health Score</h2>
            <p className="text-6xl font-black text-green-400">{data.score}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Top Repos</h2>
            {data.top.map((r: any) => (
              <div key={r.name} className="flex justify-between p-3 bg-black rounded mt-2">
                <span>{r.name}</span>
                <span className="text-yellow-500">★ {r.stars}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}