import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Plus } from 'lucide-react';

interface Props {
  products: any[];
  loading: boolean;
  addToCart: (p: any) => void;
}

export const ProductList = ({ products, loading, addToCart }: Props) => (
  /* Dynamic Grid Logic:
     - 1 col on Mobile
     - 2 cols on Small/Med Tablets (sm/md)
     - 3 cols on Desktops (lg)
     - 4 cols on Ultra-wide/Large Screens (xl)
  */
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-12 mt-4 pb-20 w-full"> 
    <AnimatePresence mode='popLayout'>
      {loading && products.length === 0 ? (
        [1, 2, 3, 4, 5, 6].map(i => (
          <div 
            key={i} 
            className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-[2.5rem] h-80 animate-pulse border border-slate-200/50 dark:border-slate-800/50" 
          />
        ))
      ) : products.length > 0 ? (
        products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.05, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-xl p-[1px] rounded-[2.6rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500"
          >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-transparent to-slate-200 dark:from-slate-800 dark:via-transparent dark:to-slate-700 opacity-100 group-hover:from-blue-600 group-hover:to-cyan-400 transition-all duration-700" />
            
            <div className="relative flex flex-col h-full p-6 bg-white dark:bg-slate-950 rounded-[2.5rem]">
              {/* Image Container */}
              <div className="relative w-full aspect-square mb-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center overflow-hidden border border-slate-100 dark:border-white/5">
                <Package className="w-16 h-16 text-slate-200 dark:text-slate-800 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-out" />
                
                {/* Match Badge */}
                {product.similarity !== undefined && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-blue-500/20 shadow-sm">
                    <Sparkles className="w-3 h-3 text-blue-500 fill-blue-500/20" />
                    <span className="text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest">
                      {Math.round(product.similarity * 100)}% Match
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="h-0.5 w-8 bg-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  
                  <p className="text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-2 text-xs">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Price</p>
                    <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                      ${product.price}
                    </span>
                  </div>

                  <button 
                    onClick={() => addToCart(product)} 
                    className="group/btn relative h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-blue-600 overflow-hidden transition-all active:scale-95 shadow-lg shadow-blue-500/10"
                  >
                    <div className="relative z-10 flex items-center gap-2 text-white font-bold">
                      <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="col-span-full text-center py-40 bg-slate-50/50 dark:bg-slate-900/20 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-inner"
        >
          <div className="inline-flex p-6 rounded-full bg-white dark:bg-white/5 mb-6 shadow-sm">
            <Package className="w-12 h-12 text-slate-300 dark:text-slate-700" />
          </div>
          <p className="text-slate-400 font-medium text-lg tracking-wide">No inventory matches found.</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);