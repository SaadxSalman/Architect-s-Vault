'use client';
import { trpc } from '@/utils/trpc';

export default function Dashboard() {
  const crisisQuery = trpc.monitor.getActiveCrises.useQuery();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Aether-Agent Monitor</h1>
      {crisisQuery.isLoading ? <p>Scanning satellite data...</p> : (
        <ul>
          {crisisQuery.data?.map(crisis => (
            <li key={crisis.id} className="border-b py-2">
              {crisis.type} detected in {crisis.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}