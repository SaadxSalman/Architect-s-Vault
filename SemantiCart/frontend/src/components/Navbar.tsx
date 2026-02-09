'use client';

import { ShoppingBag, Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShoppingBag className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            VECTOR<span className="text-blue-600">STORE</span>
          </span>
        </div>

        {/* GitHub Link Only */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <a
            href="https://github.com/saadxsalman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-black transition"
          >
            <Github className="w-4 h-4" /> saadxsalman
          </a>
        </div>
      </div>
    </nav>
  );
}