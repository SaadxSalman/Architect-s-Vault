export default function Storefront({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <div key={product.id} className="rounded-xl overflow-hidden border border-gray-200">
          <img src={product.generatedImageUrl} alt={product.name} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{product.personalizedDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
}