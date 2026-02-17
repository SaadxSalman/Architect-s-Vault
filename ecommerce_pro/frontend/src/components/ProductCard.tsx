import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300">
      <div 
        className="h-52 bg-slate-100 cursor-pointer overflow-hidden" 
        onClick={() => onSelect(product)}
      >
        <img 
          src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
          alt={product.name}
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-800">{product.name}</h3>
        <p className="text-indigo-600 font-black text-2xl mb-4">${product.price}</p>
        <div className="flex gap-2">
          <button 
            onClick={() => onSelect(product)} 
            className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition"
          >
            Details
          </button>
          <button 
            onClick={() => onAddToCart(product)} 
            className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}