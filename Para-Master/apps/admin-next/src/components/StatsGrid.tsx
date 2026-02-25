// apps/admin-next/src/components/StatsGrid.tsx
export default function StatsGrid({ totalParasites, pendingCuration }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="p-6 bg-white shadow rounded-xl border-l-4 border-blue-600">
        <p className="text-sm text-gray-500 uppercase font-bold">Total Species</p>
        <p className="text-3xl font-mono">{totalParasites}</p>
      </div>
      <div className="p-6 bg-white shadow rounded-xl border-l-4 border-orange-500">
        <p className="text-sm text-gray-500 uppercase font-bold">Argilla Pending</p>
        <p className="text-3xl font-mono">{pendingCuration}</p>
      </div>
      {/* Add more metrics as needed */}
    </div>
  );
}