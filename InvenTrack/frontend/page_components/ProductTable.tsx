import { Loader2, Plus, ArrowDownLeft } from 'lucide-react';
import StockBadge from './StockBadge';

interface ProductTableProps {
  loading: boolean;
  products: any[];
  onTransaction: (id: string, type: 'IN' | 'OUT') => void;
}

export default function ProductTable({ loading, products, onTransaction }: ProductTableProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4 bg-white rounded-2xl border border-slate-200">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-500 font-medium">Syncing with Supabase...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Product Info</th>
              <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Stock Level</th>
              <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Price</th>
              <th className="p-5 text-sm font-semibold text-slate-600 uppercase">Status</th>
              <th className="p-5 text-sm font-semibold text-slate-600 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-5">
                  <div className="font-bold text-slate-800">{product.name}</div>
                  <div className="text-xs text-slate-400 font-mono">{product.sku}</div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{product.stock_quantity}</span>
                    <span className="text-slate-300 text-xs italic">/ min {product.reorder_level}</span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="text-sm font-medium text-slate-700">${product.price}</div>
                  <div className="text-[10px] text-slate-400">Cost: ${product.cost_price}</div>
                </td>
                <td className="p-5">
                  <StockBadge qty={product.stock_quantity} min={product.reorder_level} />
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onTransaction(product.id, 'IN')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs font-bold"
                    >
                      <Plus size={14} /> RESTOCK
                    </button>
                    <button 
                      onClick={() => onTransaction(product.id, 'OUT')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-all text-xs font-bold"
                    >
                      <ArrowDownLeft size={14} /> SALE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}