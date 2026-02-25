<script lang="ts">
  let reasoning = "Waiting for agent events...";
  let loading = false;

  async function askGemma(context: string) {
    loading = true;
    const res = await fetch('http://localhost:3000/explain', {
        method: 'POST',
        body: JSON.stringify(context)
    });
    reasoning = await res.json();
    loading = false;
  }
</script>

<div class="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-6 rounded-xl border border-indigo-500/30">
  <h3 class="text-indigo-400 font-bold flex items-center gap-2 mb-4">
    <span>✨</span> Gemma Intelligence
  </h3>
  
  <div class="text-sm text-slate-300 leading-relaxed font-serif italic">
    {#if loading}
      <span class="animate-pulse">Gemma is thinking...</span>
    {:else}
      "{reasoning}"
    {/if}
  </div>
</div>