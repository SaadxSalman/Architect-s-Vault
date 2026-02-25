import React, { useState, useEffect } from 'react';
import { Activity, Target, MessageSquare, ShieldAlert } from 'lucide-react';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    playType: "Analyzing...",
    confidence: 0,
    suggestion: "Waiting for stream data...",
  });

  // Mock live data - Replace with tRPC subscriptions/WebSockets
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics({
        playType: "Fast Break / Transition",
        confidence: 0.92,
        suggestion: "Force ball-handler to the left sideline. Shift safety to deep cover.",
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tighter text-blue-500">APEX-AGENT <span className="text-white">v1.0</span></h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/50">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-red-500 uppercase">Live Feed</span>
          </div>
          <span className="text-slate-400 font-mono text-sm">GITHUB: saadsalmanakram</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Video Feed & Heatmap */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center text-slate-700">
              {/* This is where your RTSP stream or HLS player goes */}
              <p className="font-mono">[ RAW VIDEO STREAM + VISION OVERLAY ]</p>
            </div>
            
            {/* Dynamic Overlay Label */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
              <p className="text-[10px] text-slate-400 uppercase">Current Play</p>
              <p className="text-lg font-bold text-blue-400">{analytics.playType}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={<Activity size={18}/>} label="Processing Latency" value="14ms" color="text-green-400" />
            <StatCard icon={<Target size={18}/>} label="Tracking Accuracy" value="98.4%" color="text-blue-400" />
            <StatCard icon={<ShieldAlert size={18}/>} label="Threat Level" value="High" color="text-orange-400" />
          </div>
        </div>

        {/* Right Column: Tactical Intelligence */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 h-full">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="text-blue-500" size={20} />
              <h2 className="font-semibold">Tactical Prediction Agent</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg">
                <p className="text-xs text-blue-400 uppercase font-bold mb-1">Recommended Edge</p>
                <p className="text-sm leading-relaxed text-slate-300 italic">
                  "{analytics.suggestion}"
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Live Commentary Feed</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <CommentaryItem time="12:44" text="Vision Transformer detected defensive rotation shift." />
                  <CommentaryItem time="12:45" text="Historical similarity matched: 89% correlation to 2023 Finals Play #4." />
                  <CommentaryItem time="12:46" text="Predicting offensive drive to the paint." isNew />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
    <div className="flex items-center gap-2 text-slate-500 mb-1">
      {icon} <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
    </div>
    <div className={`text-xl font-mono font-bold ${color}`}>{value}</div>
  </div>
);

const CommentaryItem = ({ time, text, isNew }: any) => (
  <div className={`text-sm p-2 rounded ${isNew ? 'bg-white/5 border-l-2 border-blue-500' : ''}`}>
    <span className="text-slate-500 font-mono text-[10px] mr-2">{time}</span>
    <span className="text-slate-300">{text}</span>
  </div>
);

export default Dashboard;