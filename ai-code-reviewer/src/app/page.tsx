"use client";
import { Github, Bot, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <header className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <Bot size={64} className="text-blue-500 animate-pulse" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          saadxsalman&apos;s <span className="text-blue-500">Code Bot</span>
        </h1>
        <p className="text-slate-400 text-lg">AI-powered code reviews for your GitHub Pull Requests.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<ShieldCheck className="text-green-400" />}
          title="Secure"
          desc="Validates HMAC signatures for every GitHub webhook."
        />
        <FeatureCard 
          icon={<Zap className="text-yellow-400" />}
          title="Instant"
          desc="Real-time reviews using Gemini 1.5 Flash."
        />
        <FeatureCard 
          icon={<Github className="text-slate-200" />}
          title="Integrated"
          desc="Directly comments on your PR diff lines."
        />
      </div>

      <div className="mt-20 p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
        <h2 className="text-xl font-bold mb-4">Bot Status</h2>
        <div className="flex items-center gap-2 text-green-400">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          Listening for webhooks at <code className="bg-black px-2 py-1 rounded ml-2">/api/webhook</code>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}