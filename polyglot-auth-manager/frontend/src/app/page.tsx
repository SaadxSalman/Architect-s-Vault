"use client";
import { trpc } from "./layout";
import { useState } from "react";

export default function Home() {
  const tasks = trpc.getTasks.useQuery();
  const createTask = trpc.createTask.useMutation({
    onSuccess: () => tasks.refetch(),
  });
  const [title, setTitle] = useState("");

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Polyglot Resource Manager</h1>
      
      <div className="bg-slate-800 p-6 rounded-lg mb-8 border border-slate-700">
        <h2 className="text-xl mb-4">Add New Task (tRPC)</h2>
        <div className="flex gap-4">
          <input 
            className="bg-slate-900 border border-slate-600 p-2 rounded flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task name..."
          />
          <button 
            onClick={() => createTask.mutate({ title, status: 'pending' })}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold transition"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.data?.map((task: any) => (
          <div key={task.id} className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
            {task.title} <span className="text-slate-500 text-sm">({task.status})</span>
          </div>
        ))}
      </div>
    </main>
  );
}