import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';

interface Props {
  recommendation: any;
  addToCart: (p: any) => void;
}

export const Recommendation = ({ recommendation, addToCart }: Props) => {
  // Use the key names from our updated router.ts
  const product = recommendation?.recommendedProduct;
  const reason = recommendation?.reason;

  return (
    <div className="lg:col-span-1">
      <AnimatePresence>
        {product && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 sticky top-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <ThumbsUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Suggested for you
              </span>
            </div>
            
            <h4 className="font-bold text-lg leading-tight mb-2 dark:text-white">
              Similar Item
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic mb-6">
              "{reason}"
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="font-bold text-sm dark:text-white">{product.name}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-semibold">
                ${product.price}
              </p>
              
              <button 
                onClick={() => addToCart(product)} 
                className="w-full mt-4 bg-slate-900 dark:bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};