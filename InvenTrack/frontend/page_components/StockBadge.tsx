export default function StockBadge({ qty, min }: { qty: number; min: number }) {
  if (qty <= 0) return (
    <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase ring-1 ring-red-200">
      Out of Stock
    </span>
  );
  if (qty <= min) return (
    <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase ring-1 ring-orange-200">
      Low Stock
    </span>
  );
  return (
    <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase ring-1 ring-green-200">
      Healthy
    </span>
  );
}