'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Github, LogOut } from "lucide-react";
import { createClient } from '@/utils/supabase'; // Using @ alias for cleaner imports

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    // Check current session
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

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

        {/* Navigation Links & Auth */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="hidden sm:flex items-center gap-6 text-gray-600">
            <a href="#" className="hover:text-blue-600 transition">Shop</a>
            <a href="#" className="hover:text-blue-600 transition">Categories</a>
            <a
              href="https://github.com/saadxsalman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-black transition"
            >
              <Github className="w-4 h-4" /> saadxsalman
            </a>
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden md:block">
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <a 
                href="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}