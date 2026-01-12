import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Code Reviewer Bot",
  description: "Automated PR reviews for saadxsalman",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sansSelection">
        <nav className="border-b border-white/10 p-4 backdrop-blur-md sticky top-0 z-50">
          <div className="max-container mx-auto flex justify-between items-center">
            <h1 className="font-bold text-xl tracking-tighter text-blue-400">REVIEWER.AI</h1>
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Active: saadxsalman</div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}