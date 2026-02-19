import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polyglot Auth Manager",
  description: "Mastering APIs and Postman",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased">
        <nav className="p-4 border-b border-slate-800 flex justify-between">
          <h1 className="font-bold text-xl text-indigo-400">Polyglot Auth</h1>
          <div className="space-x-4 text-sm">
            <span>v1.0.0</span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}