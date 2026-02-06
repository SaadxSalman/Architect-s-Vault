"use client";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function Home() {
  // --- State ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 0 });

  // --- Context & Queries ---
  const utils = trpc.useUtils();
  const products = trpc.getProducts.useQuery();

  // --- Mutations ---
  const createOrder = trpc.createOrder.useMutation();
  const signUp = trpc.signUp.useMutation();

  const addProduct = trpc.addProduct.useMutation({
    onSuccess: () => {
      utils.getProducts.invalidate();
      setNewProduct({ name: "", description: "", price: 0 });
      alert("Product added successfully!");
    }
  });

  const deleteProduct = trpc.deleteProduct.useMutation({
    onSuccess: () => utils.getProducts.invalidate()
  });

  // --- Handlers ---
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
      {/* Header & Toggle Section */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          {isAdmin ? "Admin Dashboard" : "Tech Catalog"}
        </h2>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-full border border-slate-500 transition text-sm font-medium"
        >
          Switch to {isAdmin ? "Storefront" : "Admin"}
        </button>
      </div>

      {/* Shared Registration Section (Visible to all) */}
      {!isAdmin && (
        <section className="mb-12 p-6 bg-slate-900 border border-slate-700 rounded-2xl flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">New here?</h2>
            <p className="text-slate-400">Create an account to track your orders.</p>
          </div>
          <button
            onClick={handleRegister}
            disabled={signUp.isLoading}
            className="bg-white text-black hover:bg-slate-200 px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {signUp.isLoading ? "Registering..." : "Quick Register"}
          </button>
        </section>
      )}

      {/* Main Content Toggle */}
      {isAdmin ? (
        /* --- ADMIN VIEW --- */
        <div className="space-y-8 animate-in fade-in duration-500">
          <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Add New Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Product Name"
                className="bg-slate-900 p-3 rounded-lg outline-none border border-slate-600 focus:border-blue-500 transition"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                placeholder="Price"
                type="number"
                className="bg-slate-900 p-3 rounded-lg outline-none border border-slate-600 focus:border-blue-500 transition"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              />
              <button
                onClick={() => addProduct.mutate(newProduct)}
                disabled={addProduct.isLoading}
                className="bg-emerald-600 hover:bg-emerald-500 font-bold py-3 rounded-lg transition disabled:bg-slate-600"
              >
                {addProduct.isLoading ? "Adding..." : "Add Product"}
              </button>
            </div>
            <textarea
              placeholder="Description"
              className="bg-slate-900 p-3 rounded-lg outline-none border border-slate-600 focus:border-blue-500 w-full mt-4"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </section>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.isLoading ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center animate-pulse">
                      Loading management console...
                    </td>
                  </tr>
                ) : (
                  products.data?.map((p: any) => (
                    <tr key={p.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4">${p.price}</td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteProduct.mutate({ id: p.id })}
                          disabled={deleteProduct.isLoading}
                          className="text-red-400 hover:text-red-300 underline disabled:text-slate-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* --- CUSTOMER VIEW --- */
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl mb-8 font-semibold">Latest Tech</h2>

          {products.isLoading ? (
            <p className="text-slate-400 animate-pulse text-center py-20">Loading gadgets...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.data?.map((product: any) => (
                <div
                  key={product.id}
                  className="group bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 hover:scale-[1.02] transition-all"
                >
                  <div className="h-40 bg-slate-700 rounded-xl mb-4 flex items-center justify-center text-slate-500 italic">
                    No Image Available
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition">
                    {product.name}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-mono text-emerald-400 font-bold">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleBuy(product.id)}
                      disabled={createOrder.isLoading}
                      className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition disabled:bg-slate-600"
                    >
                      {createOrder.isLoading ? "..." : "Buy Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}