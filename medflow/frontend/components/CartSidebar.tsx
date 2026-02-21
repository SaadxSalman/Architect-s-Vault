import { ShoppingCart, CheckCircle, Download, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/store/useCart';

interface CartSidebarProps {
  isSuccess: boolean;
  setIsSuccess: (val: boolean) => void;
  lastOrderId: string;
  downloadInvoice: () => void;
  handleCheckout: () => void;
}

export default function CartSidebar({ isSuccess, setIsSuccess, lastOrderId, downloadInvoice, handleCheckout }: CartSidebarProps) {
  const { items, removeItem, updateQuantity } = useCart();
  const total = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const requiresRx = items.some(i => i.isPrescriptionRequired);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 h-fit shadow-xl sticky top-24">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b pb-4 text-slate-800">
        <ShoppingCart className="text-sky-600" size={20} /> Order Summary
      </h3>

      {isSuccess ? (
        <div className="text-center py-6 animate-in zoom-in duration-300">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-emerald-600" size={32} />
          </div>
          <h4 className="font-bold text-slate-900 text-lg">Order Confirmed</h4>
          <p className="text-xs text-slate-400 mb-4">ID: {lastOrderId}</p>
          <button onClick={downloadInvoice} className="w-full flex items-center justify-center gap-2 bg-sky-50 text-sky-600 py-3 rounded-xl font-bold text-sm hover:bg-sky-100 transition">
            <Download size={18} /> Get Invoice
          </button>
          <button onClick={() => setIsSuccess(false)} className="mt-4 text-xs text-slate-400 underline block w-full">Back to Store</button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center py-12 text-slate-400 text-sm">Cart is empty.</p>
          ) : (
            <>
              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{item.name}</span>
                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-slate-100 rounded text-slate-600"><Minus size={14} /></button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-slate-100 rounded text-slate-600"><Plus size={14} /></button>
                      </div>
                      <span className="font-bold text-slate-800 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold text-sky-600">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-4 hover:bg-black transition-all shadow-lg">
                {requiresRx ? 'Upload Rx & Checkout' : 'Checkout Now'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}