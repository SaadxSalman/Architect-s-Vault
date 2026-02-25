<script lang="ts">
    import { onMount } from 'svelte';
    import { threatStream, engineStatus, connectToEngine } from '$lib/socketStore';

    onMount(() => {
        // Connect to the Rust Engine WebSocket port
        connectToEngine('ws://localhost:8080');
    });
</script>

<main class="p-8 bg-black text-green-500 min-h-screen font-mono">
    <div class="flex justify-between items-center border-b border-green-900 pb-4">
        <h1 class="text-2xl font-bold tracking-tighter">GUARDIAN_HEARTBEAT_v1.0</h1>
        <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full {$engineStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}"></span>
            <span class="uppercase text-xs">{$engineStatus}</span>
        </div>
    </div>

    <section class="mt-6">
        <h2 class="text-sm opacity-50 mb-2">RAW_TRAFFIC_STREAM</h2>
        <div class="bg-zinc-900 p-4 rounded border border-green-900 h-96 overflow-y-auto">
            {#each $threatStream as msg}
                <p class="text-xs py-1 border-b border-zinc-800">
                    <span class="text-green-800">[{new Date().toLocaleTimeString()}]</span> {msg}
                </p>
            {:else}
                <p class="text-zinc-700 italic">Waiting for engine data...</p>
            {/each}
        </div>
    </section>
</main>