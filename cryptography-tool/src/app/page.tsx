"use client";
import React, { useState, useTransition } from 'react';
import CryptoJS from 'crypto-js';
import { runRustBenchmarkAction } from './actions'; // We will create this file next

export default function CryptoPage() {
  const [input, setInput] = useState("Heavy data to encrypt ".repeat(1000));
  const [results, setResults] = useState<{ rust: number; js: number } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleBenchmark = async () => {
    const key = "12345678901234567890123456789012"; // 32 bytes

    // 1. JS Benchmark (Runs in your Browser)
    const startJS = performance.now();
    for (let i = 0; i < 100; i++) {
      CryptoJS.AES.encrypt(input, key).toString();
    }
    const endJS = performance.now();
    const jsTime = endJS - startJS;

    // 2. Rust Benchmark (Runs on the Server via Server Action)
    startTransition(async () => {
      const startRust = performance.now();
      
      const response = await runRustBenchmarkAction(input, key);
      
      const endRust = performance.now();
      
      if (response.success) {
        setResults({ 
          js: jsTime, 
          rust: endRust - startRust 
        });
      } else {
        alert("Rust execution failed. Check server console.");
      }
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">High-Speed Cryptography</h1>
        <p className="text-slate-500 font-mono text-sm">saadxsalman/crypto-tool</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Input Data (String):</label>
        <textarea 
          className="w-full p-4 border rounded bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none transition"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <button 
        onClick={handleBenchmark}
        disabled={isPending}
        className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
          isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-200"
        }`}
      >
        {isPending ? "Processing Rust FFI..." : "Run 100x Benchmark"}
      </button>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 border-2 border-blue-100 rounded-xl bg-blue-50/50">
            <h2 className="font-bold text-blue-800 mb-2">Browser JavaScript</h2>
            <p className="text-3xl font-mono font-bold text-blue-600">{results.js.toFixed(2)} ms</p>
            <p className="text-xs text-blue-500 mt-2">Library: Crypto-JS</p>
          </div>
          
          <div className="p-6 border-2 border-orange-100 rounded-xl bg-orange-50/50">
            <h2 className="font-bold text-orange-800 mb-2">Server Rust (FFI)</h2>
            <p className="text-3xl font-mono font-bold text-orange-600">{results.rust.toFixed(2)} ms</p>
            <p className="text-xs text-orange-500 mt-2">Library: napi-rs + aes-gcm</p>
          </div>
        </div>
      )}
    </div>
  );
}