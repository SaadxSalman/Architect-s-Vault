// components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Section */}
        <div className="group flex items-center gap-2 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
            📦
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            saadxsalman <span className="text-blue-600">Inventory</span>
          </span>
        </div>
      </div>
    </nav>
  );
}