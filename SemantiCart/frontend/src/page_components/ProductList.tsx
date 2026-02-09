import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Plus } from 'lucide-react';

interface Props {
  products: any[];
  loading: boolean;
  addToCart: (p: any) => void;
}

export const ProductList = ({ products, loading, addToCart }: Props) => (
  <div className="lg:col-span-3 space-y-6">
    <AnimatePresence mode='popLayout'>
      {loading && products.length === 0 ? (
        [1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl h-48 animate-pulse border border-slate-100 dark:border-slate-800" />
        ))
      ) : products.length > 0 ? (
        products.map((product) => (
          <motion.div key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-xl dark:hover:shadow-blue-900/10 transition-shadow group">
            <div className="w-full md:w-48 aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
              <Package className="w-12 h-12 text-slate-200 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition dark:text-white">{product.name}</h3>
                {product.similarity !== undefined && (
                  <span className="text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {Math.round(product.similarity * 100)}% Match
                  </span>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{product.description}</p>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white">${product.price}</span>
                <button onClick={() => addToCart(product)} className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
                  Add to Cart <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">No direct matches found.</p>
        </div>
      )}
    </AnimatePresence>
  </div>
);