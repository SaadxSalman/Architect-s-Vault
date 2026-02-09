import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface Props {
  recommendation: any;
  addToCart: (p: any) => void;
}

export const AIRecommendation = ({ recommendation, addToCart }: Props) => (
  <div className="lg:col-span-1">
    <AnimatePresence>
      {recommendation && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-blue-600 p-6 rounded-3xl text-white sticky top-10 shadow-2xl shadow-blue-200 dark:shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 fill-white" />
            <span className="text-xs font-bold uppercase tracking-widest">AI Top Pick</span>
          </div>
          <h4 className="font-bold text-lg leading-tight mb-2">Perfect for your search</h4>
          <p className="text-blue-100 text-sm italic mb-6">"{recommendation.reason}"</p>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
            <p className="font-bold text-sm">{recommendation.product.name}</p>
            <p className="text-xs text-blue-200 mt-1">${recommendation.product.price}</p>
            <button onClick={() => addToCart(recommendation.product)} className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition">
              Quick Add
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);