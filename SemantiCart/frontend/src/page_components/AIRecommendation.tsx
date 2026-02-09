import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react'; // Changed Zap to Star since it's not AI anymore

interface Props {
  recommendation: any;
  addToCart: (p: any) => void;
}

export const ProductRecommendation = ({ recommendation, addToCart }: Props) => {
  // Check if we actually have a product to show
  const product = recommendation?.recommendedProduct || recommendation?.recommendedProducts?.[0];
  const reason = recommendation?.reason;

  return (
    <div className="lg:col-span-1">
      <AnimatePresence>
        {product && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }} 
            className="bg-slate-900 p-6 rounded-3xl text-white sticky top-10 shadow-2xl border border-slate-800"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-blue-500 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Related Pick</span>
            </div>
            
            <h4 className="font-bold text-lg leading-tight mb-2">You might also like</h4>
            <p className="text-slate-400 text-sm italic mb-6">"{reason}"</p>
            
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="font-bold text-sm">{product.name}</p>
              <p className="text-xs text-slate-400 mt-1">${product.price}</p>
              
              <button 
                onClick={() => addToCart(product)} 
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-500 transition"
              >
                Quick Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};