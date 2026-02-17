"use client";
import { Product } from '@/types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-[60] p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-full bg-slate-200">
            <img src={product.image_url} className="w-full h-full object-cover" alt={product.name} />
          </div>
          <div className="p-8 flex flex-col">
            <button onClick={onClose} className="self-end text-slate-400 hover:text-slate-900 font-bold transition">✕ Close</button>
            <h2 className="text-3xl font-black text-slate-800 mt-4">{product.name}</h2>
            <p className="text-indigo-600 text-3xl font-mono font-black mt-2">${product.price}</p>
            <div className="mt-8 bg-slate-50 p-4 rounded-2xl flex-grow overflow-y-auto max-h-48">
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Customer Reviews</h4>
              {product.reviews?.length > 0 ? (
                product.reviews.map(r => (
                  <p key={r.id} className="text-sm italic text-slate-600 mb-3 border-l-4 border-indigo-200 pl-3">
                    "{r.content}" — <span className="text-amber-500">⭐{r.rating}</span>
                  </p>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">No reviews for this item yet.</p>
              )}
            </div>
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:bg-indigo-700 transition active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}