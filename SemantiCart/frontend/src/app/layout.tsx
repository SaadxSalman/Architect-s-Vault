import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import RealTimeListener from "@/components/RealTimeListener";
import "./globals.css";

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
      <body className={`${inter.className} antialiased`}>
        {/* Handles the real-time Supabase subscriptions */}
        <RealTimeListener />

        {/* Navbar is a Client Component, but used inside this Server Layout */}
        <Navbar />

        {/* Main Content Area */}
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>

        {/* Static Footer */}
        <footer className="bg-white border-t border-gray-200 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            © 2026 Semantic Search Project by saadxsalman. Powered by Supabase & OpenAI.
          </div>
        </footer>
      </body>
    </html>
  );
}