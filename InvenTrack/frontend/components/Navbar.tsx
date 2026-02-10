// components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        
        {/* Brand Section */}
        <div className="group flex items-center gap-3 cursor-pointer">
          {/* Refined Logo: No emoji, uses a geometric SVG */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 transition-all duration-300 group-hover:bg-blue-600">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5" 
              className="h-5 w-5"
            >
              <path d="M21 8l-9-4-9 4v8l9 4 9-4V8z" />
              <path d="M3 8l9 4 9-4" />
              <path d="M12 12v8" />
            </svg>
          </div>

          <div className="flex flex-col -space-y-1">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-900">
              saadxsalman
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-600">
              Inventory Management
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}