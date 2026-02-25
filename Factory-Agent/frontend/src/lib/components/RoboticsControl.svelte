<script lang="ts">
  export let itemsProcessed = 1240;
  export let lineSpeed = 60;
  let divertCount = 12;

  // Simulate a live counter
  setInterval(() => {
    if (lineSpeed > 0) itemsProcessed++;
  }, 1000);
</script>

<div class="p-6 bg-slate-900 border border-slate-700 rounded-xl">
  <div class="flex items-center gap-3 mb-4">
    <div class="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
    <h3 class="text-lg font-semibold text-slate-200">Robotics Control System</h3>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="bg-slate-800 p-3 rounded-lg">
      <p class="text-xs text-slate-400 uppercase">Throughput</p>
      <p class="text-2xl font-mono font-bold text-white">{itemsProcessed}</p>
    </div>
    <div class="bg-slate-800 p-3 rounded-lg">
      <p class="text-xs text-slate-400 uppercase">Line Speed</p>
      <p class="text-2xl font-mono font-bold text-emerald-400">{lineSpeed} <span class="text-sm">u/min</span></p>
    </div>
  </div>

  <div class="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex justify-between items-center">
    <span class="text-sm text-red-300">Diverted (Defects)</span>
    <span class="text-lg font-bold text-red-500">{divertCount}</span>
  </div>
</div>