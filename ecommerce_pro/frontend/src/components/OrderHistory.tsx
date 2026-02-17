interface OrderHistoryProps {
  orders: Order[];
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) return null;

  return (
    <section className="mt-12 mb-20">
      <h2 className="text-2xl font-bold mb-6 text-slate-400 italic">Your Vault History</h2>
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-5">Order ID</th>
              <th className="p-5">Items</th>
              <th className="p-5 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-indigo-50/20 transition">
                <td className="p-5 text-indigo-400 font-mono font-bold">#{o.id}</td>
                <td className="p-5 text-slate-700 text-sm font-medium">{o.product_names}</td>
                <td className="p-5 text-right font-black text-green-600">${o.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}