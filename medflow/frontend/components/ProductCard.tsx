import { Pill } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-sky-300 transition-all shadow-sm group">
      <div className="flex justify-between mb-4">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${product.isPrescriptionRequired ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {product.isPrescriptionRequired ? 'Rx Needed' : 'OTC'}
        </span>
        <Pill size={16} className="text-slate-300 group-hover:text-sky-500 transition" />
      </div>
      <p className="text-xs text-slate-400 mb-1">{product.category}</p>
      <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
      <p className="text-xl text-sky-600 mt-2 font-bold">${product.price.toFixed(2)}</p>
      <button 
        onClick={() => addItem(product)} 
        className="mt-6 w-full bg-slate-50 text-slate-900 py-3 rounded-xl font-bold hover:bg-sky-600 hover:text-white transition-colors border border-slate-200"
      >
        Add to Cart
      </button>
    </div>
  );
}