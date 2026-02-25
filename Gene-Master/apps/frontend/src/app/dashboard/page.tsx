import Image from "next/image";
import { Search, ShieldCheck, Activity, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}

export default function ResearcherDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Database className="text-blue-600" /> Gene-Master Node <span className="text-slate-400 font-light">#042</span>
        </h1>
        <div className="flex gap-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <ShieldCheck size={16} /> Privacy Guard Active
          </div>
        </div>
      </div>

      {/* Query Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">New Privacy-Preserving Query</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask your query (e.g. 'Analyze variants in APOE associated with neurodegeneration')..."
                className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <Search className="absolute left-4 top-4 text-slate-400" />
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
              Execute Agentic Analysis
            </button>
          </div>

          {/* Results Visualization Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex items-center justify-center border-dashed">
            <div className="text-center text-slate-400">
              <Activity className="mx-auto mb-2 opacity-20" size={48} />
              <p>Submit a query to visualize validated results</p>
            </div>
          </div>
        </div>

        {/* Sidebar: Agent Status */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4">Agentic Multi-Agent System</h3>
            <div className="space-y-4">
              <AgentStatus label="Query Agent" status="Idle" />
              <AgentStatus label="Computation Agent" status="Idle" />
              <AgentStatus label="Validation Agent" status="Standby" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentStatus({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-blue-400 font-mono text-sm">{status}</span>
    </div>
  );
}