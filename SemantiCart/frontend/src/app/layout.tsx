import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}