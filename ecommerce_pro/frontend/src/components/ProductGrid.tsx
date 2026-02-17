import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  searchQuery: string;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, loading, searchQuery, onSelect, onAddToCart }: ProductGridProps) {
  return (
    <section className="lg:col-span-3">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        {searchQuery ? `Results for "${searchQuery}"` : "Featured Inventory"}
      </h2>
      
      {loading ? (
        <div className="flex justify-center p-20">
          <p className="animate-pulse text-indigo-500 font-bold">Loading vault...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={onSelect} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-400 italic">No products match your search.</p>
        </div>
      )}
    </section>
  );
}