<script>
  import InspectionMonitor from '$lib/components/InspectionMonitor.svelte';
</script>

<main class="min-h-screen bg-slate-950 p-8">
  <header class="mb-12">
    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
      Factory-Agent Control Center
    </h1>
    <p class="text-slate-400">System Monitoring for saadsalmanakram</p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <InspectionMonitor />
    
    <div class="p-6 bg-slate-900 rounded-xl border border-slate-800 opacity-50">
      <h2 class="text-xl font-bold mb-2">Logistics Agent</h2>
      <p class="text-sm">Supply chain optimization pending...</p>
    </div>

    <div class="p-6 bg-slate-900 rounded-xl border border-slate-800 opacity-50">
      <h2 class="text-xl font-bold mb-2">Robotics Control</h2>
      <p class="text-sm">Real-time throughput data syncing...</p>
    </div>
  </div>
</main>