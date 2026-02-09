import { Sun, Moon } from 'lucide-react';

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const ThemeAdminToggles = ({ darkMode, setDarkMode }: Props) => (
  <div className="fixed bottom-8 left-8 z-50">
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700 transition-all hover:scale-110 active:scale-95"
      title="Toggle Dark Mode"
    >
      {darkMode ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-slate-600" />
      )}
    </button>
  </div>
);