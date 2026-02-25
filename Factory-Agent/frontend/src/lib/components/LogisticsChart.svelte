<script lang="ts">
  export let stockLevel = 450;
  export let reorderRequired = false;

  // Simple reactive visual for stock
  $: percentage = (stockLevel / 1000) * 100;
</script>

<div class="p-6 bg-slate-900 border border-slate-700 rounded-xl">
  <h3 class="text-lg font-semibold text-slate-200 mb-4">Logistics & Supply Chain</h3>
  
  <div class="space-y-4">
    <div class="flex justify-between text-sm">
      <span class="text-slate-400">Raw Material Inventory</span>
      <span class="text-blue-400 font-mono">{stockLevel} / 1000 units</span>
    </div>
    
    <div class="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
      <div class="bg-blue-500 h-full transition-all duration-500" style="width: {percentage}%"></div>
    </div>

    {#if reorderRequired}
      <div class="flex items-center gap-2 text-amber-500 text-sm font-bold animate-pulse">
        <span>⚠️ Low Stock: Automatic Reorder Triggered</span>
      </div>
    {:else}
      <div class="text-emerald-500 text-xs">✅ Supply chain stable</div>
    {/if}
  </div>
</div>