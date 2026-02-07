import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ShoppingBag, Github } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saadxsalman | AI Semantic Store",
  description: "Next.js + tRPC + Supabase Vector",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                VECTOR<span className="text-blue-600">STORE</span>
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-blue-600 transition">
                Shop
              </a>
              <a href="#" className="hover:text-blue-600 transition">
                Categories
              </a>
              <a
                href="https://github.com/saadxsalman"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-black transition"
              >
                <Github className="w-4 h-4" /> saadxsalman
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen bg-gray-50">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            © 2026 Semantic Search Project by saadxsalman. Powered by Supabase &
            OpenAI.
          </div>
        </footer>
      </body>
    </html>
  );
}