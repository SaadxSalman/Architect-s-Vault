"use client";
import React, { useState } from 'react';
import { Upload, FileVideo, Brain, Activity } from 'lucide-react';

export default function UploadZone() {
  const [files, setFiles] = useState<{ gait?: File; scan?: File }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async () => {
    setIsProcessing(true);
    const formData = new FormData();
    if (files.gait) formData.append('gait_video', files.gait);
    if (files.scan) formData.append('brain_scan', files.scan);

    try {
      // Directing to your Node.js Core Backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_CORE_API_URL}/api/v1/analyze`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log("Analysis Started:", result);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Gait Video Upload */}
        <label className="flex flex-col items-center p-6 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-750 transition">
          <FileVideo className="w-10 h-10 mb-2 text-blue-400" />
          <span className="text-sm font-medium">Upload Gait Video</span>
          <input type="file" className="hidden" onChange={(e) => setFiles({...files, gait: e.target.files?.[0]})} />
          {files.gait && <p className="mt-2 text-xs text-green-400">{files.gait.name}</p>}
        </label>

        {/* Brain Scan Upload */}
        <label className="flex flex-col items-center p-6 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-750 transition">
          <Brain className="w-10 h-10 mb-2 text-purple-400" />
          <span className="text-sm font-medium">Upload Brain Scan (MRI)</span>
          <input type="file" className="hidden" onChange={(e) => setFiles({...files, scan: e.target.files?.[0]})} />
          {files.scan && <p className="mt-2 text-xs text-green-400">{files.scan.name}</p>}
        </label>
      </div>

      <button 
        onClick={handleUpload}
        disabled={!files.gait || !files.scan || isProcessing}
        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-lg font-bold flex items-center justify-center gap-2 transition"
      >
        {isProcessing ? <Activity className="animate-spin" /> : <Upload />}
        {isProcessing ? "Processing Neurological Data..." : "Run Diagnostic Agent"}
      </button>
    </div>
  );
}