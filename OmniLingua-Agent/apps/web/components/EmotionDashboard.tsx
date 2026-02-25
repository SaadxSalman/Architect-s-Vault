import React, { useState } from 'react';
import { Camera, Smile, Frown, Activity, Upload, Brain } from 'lucide-react';

export const EmotionDashboard = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [emotionData, setEmotionData] = useState({
    primary: "Analyzing...",
    confidence: 0,
    subtext: "Waiting for input..."
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Emotional Subtext Analysis</h1>
        <p className="text-slate-500 text-lg">OmniLingua Vision Agent v1.0</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Feed Section */}
        <div className="lg:col-span-2 bg-black rounded-2xl aspect-video relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-slate-700 m-4 rounded-xl">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-slate-500 mb-4" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
                Upload Video for Analysis
              </button>
              <p className="text-slate-500 mt-2 text-sm">MP4, MOV, or WebM supported</p>
            </div>
          </div>
          {/* Overlay Tag */}
          <div className="absolute top-8 left-8 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
            <span className="h-2 w-2 bg-white rounded-full"></span> LIVE VISION
          </div>
        </div>

        {/* Stats & Insights Sidebar */}
        <div className="space-y-6">
          {/* Emotion Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-700">Detected Emotion</h3>
              <Smile className="text-yellow-500" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2">{emotionData.primary}</div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-slate-400 mt-2">75% Confidence Score</p>
          </div>

          {/* Cultural Subtext Card */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm text-white">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-purple-400" />
              <h3 className="font-semibold">Cultural Interpretation</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              "The subject's indirect gaze combined with subtle nodding suggests 'High-Context' 
              agreement, common in Southeast Asian professional settings."
            </p>
          </div>

          {/* Activity Logs */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4">Linguistic Sync</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <div className="text-xs text-slate-500">
                    <span className="font-bold text-slate-700 italic">Frame {i*100}:</span> 
                    Gesture matched translation nuance.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};