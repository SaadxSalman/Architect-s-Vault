"use client";
import { trpc } from "../utils/trpc";

export default function Home() {
  // Queries & Mutations
  const products = trpc.getProducts.useQuery();
  const createOrder = trpc.createOrder.useMutation();
  const signUp = trpc.signUp.useMutation();

  // Handlers
  const handleBuy = (id: number) => {
    createOrder.mutate({ 
      productId: id, 
      email: "saadxsalman@github.com" 
    });
    alert("Order placed!");
  };

  const handleRegister = async () => {
    try {
      const result = await signUp.mutateAsync({ 
        email: "test@example.com", 
        password: "securepassword123" 
      });
      console.log("Welcome!", result);
      alert("Registration successful!");
    } catch (err) {
      console.error("Auth failed", err);
      alert("Registration failed. Check console.");
    }
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      {/* Registration Section */}
      <section className="mb-12 p-6 bg-slate-900 border border-slate-700 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">New here?</h2>
          <p className="text-slate-400">Create an account to track your orders.</p>
        </div>
        <button 
          onClick={handleRegister}
          disabled={signUp.isLoading}
          className="bg-white text-black hover:bg-slate-200 px-6 py-2 rounded-lg font-semibold transition"
        >
          {signUp.isLoading ? "Registering..." : "Quick Register"}
        </button>
      </section>

      <h2 className="text-3xl mb-8 font-semibold">Latest Tech</h2>

      {/* Products Grid */}
      {products.isLoading ? (
        <p className="text-slate-400 animate-pulse">Loading gadgets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.data?.map((product: any) => (
            <div 
              key={product.id} 
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition group"
            >
              <h3 className="text-xl font-bold group-hover:text-blue-400 transition">
                {product.name}
              </h3>
              <p className="text-slate-400 my-2">{product.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-400 font-mono text-lg">${product.price}</span>
                <button 
                  onClick={() => handleBuy(product.id)}
                  disabled={createOrder.isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-4 py-2 rounded-lg font-medium transition"
                >
                  {createOrder.isLoading ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}