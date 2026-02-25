<script lang="ts">
  let biometrics = { heartRate: 72, sleepQuality: 'Good' };
</script>

<main class="min-h-screen bg-gray-50 p-8">
  <header class="mb-8">
    <h1 class="text-4xl font-bold text-green-600">Nutri-Coach Dashboard</h1>
    <p class="text-gray-600">Welcome back, saadsalmanakram</p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <section class="bg-white p-6 rounded-xl shadow-sm border">
      <h2 class="text-xl font-semibold mb-4">Real-Time Biometrics</h2>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">Heart Rate</span>
        <span class="text-2xl font-mono text-red-500">{biometrics.heartRate} BPM</span>
      </div>
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border">
      <h2 class="text-xl font-semibold mb-4">AI Coach Suggestion</h2>
      <p class="italic text-gray-700">"Your recovery is high today. Ideal for a high-intensity workout!"</p>
    </section>
  </div>
</main>