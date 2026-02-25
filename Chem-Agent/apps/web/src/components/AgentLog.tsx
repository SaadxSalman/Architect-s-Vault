export const AgentLog = ({ logs }: { logs: string[] }) => {
  return (
    <div className="bg-slate-900 text-green-400 p-4 font-mono text-sm h-64 overflow-y-auto rounded-lg border border-slate-700">
      <h3 className="text-white font-bold mb-2 uppercase tracking-widest underline">Agent Reasoning Log</h3>
      {logs.map((log, i) => (
        <div key={i} className="mb-1">
          <span className="text-blue-400">[{new Date().toLocaleTimeString()}]</span> {log}
        </div>
      ))}
    </div>
  );
};