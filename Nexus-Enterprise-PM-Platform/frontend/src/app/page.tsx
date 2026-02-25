"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { 
  LayoutGrid, 
  MessageSquare, 
  Activity, 
  Plus, 
  Loader2, 
  User as UserIcon 
} from "lucide-react";
import { createTaskAction } from "./actions";

// This should match the ID in your prisma/seed.ts
const WORKSPACE_ID = "enterprise-main-01";

export default function NexusDashboard() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [typing, setTyping] = useState("");
  const [isPending, startTransition] = useTransition();
  
  const formRef = useRef<HTMLFormElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initialize Real-time "Pulse" Connection
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
    
    const s = io(socketUrl, {
      auth: { workspaceId: WORKSPACE_ID }
    });

    s.on("connect", () => console.log("✅ Pulse Connected"));

    s.on("activity_log", (log) => {
      setLogs(prev => [log, ...prev].slice(0, 8));
    });

    s.on("user_typing", (user) => {
      setTyping(`${user} is editing...`);
      
      // Clear existing timeout if user keeps typing
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      
      typingTimeoutRef.current = setTimeout(() => {
        setTyping("");
      }, 2000);
    });

    setSocket(s);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      s.disconnect();
    };
  }, []);

  // 2. Handle Task Creation (Server Action + Socket Broadcast)
  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      // Step A: Save to MongoDB via Server Action (Passing WORKSPACE_ID)
      const result = await createTaskAction(formData, WORKSPACE_ID);
      
      if (result.success) {
        // Step B: Reset UI
        formRef.current?.reset();

        // Step C: Broadcast to Pulse Server for instant team update
        socket?.emit("task_update", { 
          title: result.task?.title, 
          status: "CREATED", 
          user: "saadxsalman" 
        });
      } else {
        console.error("Task creation failed:", result.error);
        alert(result.error);
      }
    });
  };

  return (
    <main className="max-w-7xl mx-auto p-8 animate-in fade-in duration-700">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Board</h2>
          <p className="text-zinc-500 mt-1 h-5">{typing || "Real-time sync active"}</p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
              U{i}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-black bg-indigo-600 flex items-center justify-center text-[10px]">
            +5
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column: TODO */}
          <div className="kanban-column">
            <div className="flex justify-between items-center mb-6">
              <h3 className="flex items-center gap-2 font-semibold text-zinc-400">
                <LayoutGrid size={16} /> Todo
              </h3>
              <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-500">Live</span>
            </div>

            <form ref={formRef} action={clientAction} className="mb-4">
              <div className="relative">
                <input 
                  name="title"
                  autoComplete="off"
                  placeholder="New task..." 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  onKeyDown={() => socket?.emit("typing", "saadxsalman")}
                />
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="absolute right-2 top-1.5 text-zinc-500 hover:text-white transition-colors"
                >
                  {isPending ? <Loader2 size={18} className="animate-spin text-indigo-500" /> : <Plus size={18} />}
                </button>
              </div>
            </form>

            <div className="space-y-3">
              <TaskCard title="Setup Authentication" priority="URGENT" />
              <TaskCard title="Design System Tokens" priority="MEDIUM" />
            </div>
          </div>

          <div className="kanban-column opacity-60">
            <h3 className="flex items-center gap-2 mb-6 font-semibold text-zinc-400">
              <Activity size={16} /> In Progress
            </h3>
          </div>

          <div className="kanban-column opacity-60">
            <h3 className="flex items-center gap-2 mb-6 font-semibold text-zinc-400">
              <Activity size={16} /> Done
            </h3>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 backdrop-blur-sm h-[450px] flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-6 flex items-center gap-2">
              <MessageSquare size={14} /> Audit Log
            </h3>
            <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
              {logs.map((log, i) => (
                <div key={i} className="relative pl-6 pb-2 border-l border-zinc-800 last:border-0">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                  <p className="text-xs font-medium text-white">{log.user}</p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{log.action}</p>
                  <span className="text-[9px] text-zinc-700 font-mono">
                    {new Date(log.time).toLocaleTimeString()}
                  </span>
                </div>
              ))}
              {logs.length === 0 && (
                <p className="text-zinc-600 text-xs italic text-center py-4">No recent activity.</p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-zinc-800 text-center bg-black/20">
             <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Storage Status</p>
             <p className="text-xs font-bold text-green-500 mt-1">MongoDB Synchronized</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function TaskCard({ title, priority }: { title: string, priority: string }) {
  return (
    <div className="group p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all cursor-grab active:cursor-grabbing hover:shadow-lg hover:shadow-indigo-500/5">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
          priority === 'URGENT' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
        }`}>
          {priority}
        </span>
        <UserIcon size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
      <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{title}</h4>
    </div>
  );
}