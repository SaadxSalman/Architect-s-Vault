"use client";

import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Inventory Dashboard
        </h1>
        <p className="text-slate-500">Welcome back, saadxsalman.</p>
      </div>

      <div className="relative group">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" 
          size={18} 
        />
        <input
          type="text"
          placeholder="Search by SKU or Name..."
          className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-80 transition-all bg-white shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}