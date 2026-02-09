import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Minus, Plus, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  handleCheckout: () => void;
  status: string;
}

export const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, handleCheckout, status }: Props) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-[70] shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black tracking-tighter dark:text-white">YOUR CART</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"><X className="dark:text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center mt-20">
                  <Package className="w-12 h-12 text-gray-200 dark:text-slate-700 mx-auto mb-4" />
                  <p className="text-gray-400">Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div layout key={item.product.id} className="flex gap-4 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-slate-800 rounded-xl flex items-center justify-center"><Package className="text-gray-400 w-8 h-8" /></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm leading-tight dark:text-white">{item.product.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">${item.product.price}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 border dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md"><Minus size={14} className="dark:text-white" /></button>
                        <span className="text-sm font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 border dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md"><Plus size={14} className="dark:text-white" /></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-500 self-start p-1 transition"><Trash2 size={18}/></button>
                  </motion.div>
                )
              ))}
            </div>
            <div className="border-t dark:border-slate-800 pt-6 space-y-2 mt-4">
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-black pt-2 border-t dark:border-slate-800 mt-2 dark:text-white"><span>Total</span><span>${(subtotal + tax).toFixed(2)}</span></div>
              <button onClick={handleCheckout} disabled={cart.length === 0 || status === 'Redirecting...'} className="w-full bg-slate-950 dark:bg-blue-600 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-blue-700 transition shadow-lg disabled:bg-gray-400">
                {status === 'Redirecting...' ? 'Connecting to Stripe...' : 'Checkout Now'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};