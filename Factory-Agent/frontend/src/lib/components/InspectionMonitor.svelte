<script lang="ts">
  import { onMount } from 'svelte';

  // Types matching your Rust backend
  type InspectionResult = 
    | { type: 'Clear' } 
    | { type: 'DefectDetected', confidence: number, detail: string };

  let status: 'Idle' | 'Scanning' | 'Alert' = 'Idle';
  let latestResult: InspectionResult | null = null;

  async function triggerManualScan() {
    status = 'Scanning';
    
    // In production, you'd send a real image buffer here
    const response = await fetch('http://localhost:3000/inspect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([0, 1, 2, 3]) 
    });

    const data = await response.json();
    latestResult = data;
    status = data.DefectDetected ? 'Alert' : 'Idle';
  }
</script>

<div class="p-6 bg-slate-900 text-white rounded-xl border border-slate-700 shadow-xl">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-bold tracking-tight">Microscopic Inspection Agent</h2>
    <span class="px-3 py-1 rounded-full text-xs font-mono 
      {status === 'Alert' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}">
      {status}
    </span>
  </div>

  <div class="aspect-video bg-black rounded-lg border border-slate-800 flex items-center justify-center mb-4">
    {#if status === 'Scanning'}
       <div class="loader">Scanning...</div>
    {:else}
       <p class="text-slate-500 text-sm italic">Live Camera Stream (Mock)</p>
    {/if}
  </div>

  {#if latestResult && 'DefectDetected' in latestResult}
    <div class="p-4 bg-red-900/30 border border-red-500/50 rounded-lg mb-4">
      <p class="text-red-400 font-bold">⚠️ Defect Detected</p>
      <p class="text-sm text-red-200">{latestResult.DefectDetected.detail}</p>
      <p class="text-xs mt-2 opacity-70">Confidence: {(latestResult.DefectDetected.confidence * 100).toFixed(2)}%</p>
    </div>
  {/if}

  <button 
    on:click={triggerManualScan}
    class="w-full py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-semibold"
  >
    Trigger Manual Inspection
  </button>
</div>