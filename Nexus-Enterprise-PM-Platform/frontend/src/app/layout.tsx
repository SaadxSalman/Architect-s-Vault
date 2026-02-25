import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus | Enterprise PM",
  description: "High-performance project management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-500/30">
        <nav className="border-b border-zinc-800 p-4 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              NEXUS
            </h1>
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-zinc-400 font-mono tracking-widest uppercase">System Live</span>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}