'use client'
import Editor from '@monaco-editor/react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-950 text-white">
      <h1 className="text-4xl font-bold mb-8">Synapse-360 ⚛️</h1>
      <div className="w-full max-w-4xl h-[400px] border border-slate-800 rounded-lg overflow-hidden">
        <Editor 
          height="100%" 
          defaultLanguage="typescript" 
          theme="vs-dark"
          defaultValue="// Paste code here for cognitive analysis"
        />
      </div>
      <button className="mt-6 px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-500">
        Analyze Intent
      </button>
    </main>
  );
}