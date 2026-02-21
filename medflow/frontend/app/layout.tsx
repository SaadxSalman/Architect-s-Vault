import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MedFlow | Professional Medical Ecosystem',
  description: 'Secure Medical E-Commerce',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-white p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-sky-600">MedFlow</h1>
            <div className="space-x-6 text-sm font-medium">
              <a href="/">Store</a>
              <a href="/admin">Admin Dashboard</a>
              <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">Cart (0)</span>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto p-6">{children}</main>
        <footer className="text-center p-10 text-slate-400 border-t">
          © 2026 MedFlow - Secure Rx Distribution
        </footer>
      </body>
    </html>
  );
}