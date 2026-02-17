import { CartItem } from "@/types";

interface CartSidebarProps {
  cart: CartItem[];
  onRemove: (id: number) => void;
  onDecrease: (id: number) => void;
  onIncrease: (product: any) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ cart, onRemove, onDecrease, onIncrease, onCheckout }: CartSidebarProps) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((a, b) => a + (parseFloat(b.price) * b.quantity), 0).toFixed(2);

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white p-6 rounded-3xl border border-indigo-50 sticky top-24 shadow-lg">
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-slate-800">
          🛒 Cart <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs">{totalItems}</span>
        </h2>
        {cart.length === 0 ? (
          <p className="text-slate-400 text-sm italic py-4">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4 pr-1 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="group flex flex-col py-3 border-b border-slate-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col truncate pr-2">
                      <span className="truncate text-slate-800 font-bold">{item.name}</span>
                      <span className="font-medium text-indigo-600 text-xs">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors text-xs">Remove</button>
                  </div>
                  <div className="flex items-center bg-slate-100 rounded-lg p-1 w-fit">
                    <button onClick={() => onDecrease(item.id)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:bg-red-50 transition">-</button>
                    <span className="w-8 text-center font-bold text-slate-700 text-sm">{item.quantity}</span>
                    <button onClick={() => onIncrease(item)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:bg-green-50 transition">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-dashed">
              <p className="text-xl font-black mb-4 text-slate-800">Total: ${totalPrice}</p>
              <button onClick={onCheckout} className="w-full bg-green-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-green-600 transition active:scale-95">CHECKOUT</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}