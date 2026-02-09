import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const SuccessScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-10 bg-white dark:bg-slate-950">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6">
      <Sparkles className="text-green-600 w-12 h-12" />
    </motion.div>
    <h1 className="text-4xl font-black tracking-tighter dark:text-white">PAYMENT SUCCESSFUL!</h1>
    <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md">
      Your semantic style is on the way, **saadxsalman**. Check your email for a receipt.
    </p>
    <button onClick={() => window.location.href = '/'} className="mt-8 bg-black dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg">
      Continue Shopping
    </button>
  </div>
);