import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saadxsalman Store",
  description: "Next.js + tRPC + Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          <nav className="p-4 bg-white border-b shadow-sm">
            <h1 className="text-xl font-bold">Vector Store</h1>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}