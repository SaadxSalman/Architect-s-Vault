'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('live-update', (data) => {
      setLogs((prev) => [data, ...prev].slice(0, 10));
    });
  }, []);

  return (
    <main className="p-8 bg-zinc-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-blue-500">Gemini-Game Live Monitor</h1>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="border border-zinc-800 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Perception Feed</h2>
          {/* Placeholder for Canvas/Video */}
        </div>
      </div>
    </main>
  );

  // Inside your Home component
  const [thoughts, setThoughts] = useState<any[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('agent-thought', (data) => {
      setThoughts((prev) => [data, ...prev].slice(0, 5)); // Keep last 5
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {thoughts.map((t, i) => (
        <div key={i} className="p-4 bg-zinc-900 border-l-4 border-blue-500 rounded">
          <p className="text-xs text-zinc-500">{new Date(t.timestamp).toLocaleTimeString()}</p>
          <p className="font-mono text-green-400 mt-2">Action: {t.strategy.chosenAction}</p>
          <p className="text-zinc-300 italic text-sm mt-1">"{t.strategy.rawThought}"</p>
        </div>
      ))}
    </div>
  );

}
  

