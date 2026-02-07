'use client';
import { useState, useEffect } from 'react';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/index';

// tRPC Client initialization
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await trpc.getProducts.query();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Product Catalog</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="p-4 bg-white rounded-lg shadow border">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="mt-2 font-mono text-blue-600">${p.price}</p>
            </div>
          ))}
          {products.length === 0 && <p>No products found in Supabase.</p>}
        </div>
      )}
    </div>
  );
}