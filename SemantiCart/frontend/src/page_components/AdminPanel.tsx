import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

export const AdminPanel = ({ isAdmin }: { isAdmin: boolean }) => (
  <AnimatePresence>
    {isAdmin && (
      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="max-w-4xl mx-auto p-10 bg-blue-50 dark:bg-slate-900 rounded-3xl mb-10 border-2 border-blue-200 dark:border-blue-900 overflow-hidden">
        <h2 className="text-2xl font-black mb-4 flex items-center gap-2 dark:text-white">
          <PlusCircle className="text-blue-600" /> Add New Product (AI Auto-Vectorized)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Product Name" className="p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-blue-500" />
          <input placeholder="Price" className="p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-blue-500" />
          <textarea placeholder="Description" className="col-span-2 p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-blue-500" />
          <button className="col-span-2 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition">Upload to Store</button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);