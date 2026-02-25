"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sidebar() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch sessions from /api/history/sessions
    axios.get('http://localhost:5000/api/history/sessions')
      .then(res => setSessions(res.data));
  }, []);

  return (
    <div className="w-64 bg-slate-900 h-screen p-4 border-r border-slate-800">
      <h2 className="text-sm font-semibold text-slate-400 mb-4 uppercase">History</h2>
      {sessions.map((s: any) => (
        <div key={s.sessionId} className="p-2 hover:bg-slate-800 rounded cursor-pointer truncate text-sm">
          {s.title}
        </div>
      ))}
    </div>
  );
}