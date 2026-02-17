interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-10 max-w-xl">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
      <input 
        type="text" 
        placeholder="Search gear..." 
        className="w-full p-4 pl-12 rounded-2xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all"
        value={value} 
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}