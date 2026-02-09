import { Sun, Moon } from 'lucide-react';

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const ThemeAdminToggles = ({ darkMode, setDarkMode, isAdmin, setIsAdmin }: Props) => (
  <div className="fixed top-20 right-4 flex flex-col gap-2 z-50">
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700 transition-all hover:scale-110"
    >
      {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-600" />}
    </button>
    <button 
      onClick={() => setIsAdmin(!isAdmin)}
      className="p-3 bg-blue-600 text-white rounded-full shadow-lg text-xs font-bold hover:scale-110 transition-all"
    >
      {isAdmin ? 'EXIT' : 'ADMIN'}
    </button>
  </div>
);