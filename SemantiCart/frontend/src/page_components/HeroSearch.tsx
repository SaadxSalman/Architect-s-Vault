import { motion } from 'framer-motion';
import { RefreshCw, Search, Loader2 } from 'lucide-react';

interface Props {
  query: string;
  setQuery: (val: string) => void;
  loading: boolean;
  handleSync: () => void;
  status: string;
  intents: string[];
}

export const HeroSearch = ({ query, setQuery, loading, handleSync, status, intents }: Props) => (
  <section className="bg-slate-950 pt-20 pb-28 px-4 text-center text-white relative overflow-hidden">
    <div className="absolute top-4 right-4 z-20">
      <button onClick={handleSync} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs transition">
        <RefreshCw className={`w-3 h-3 ${status.includes('Syncing') ? 'animate-spin' : ''}`} />
        {status || 'Sync AI Engine'}
      </button>
    </div>
    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
      SHOP BY <span className="text-blue-500">INTENT</span>
    </motion.h2>
    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">AI understands context. Search for a feeling, not just a product.</p>
    <div className="max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </div>
        <input 
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your vibe..."
          className="w-full bg-slate-900 border border-slate-800 text-white py-5 pl-14 pr-14 rounded-2xl shadow-2xl outline-none focus:border-blue-500 transition-all text-lg"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {intents.map(intent => (
          <button key={intent} onClick={() => setQuery(intent)} className="px-4 py-1.5 rounded-full border border-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-800 hover:text-white transition">
            {intent}
          </button>
        ))}
      </div>
    </div>
  </section>
);