import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MedFlow | Professional Medical Ecosystem',
  description: 'Secure Pharmacy & Medical Equipment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav className="border-b p-4 flex justify-between items-center bg-white sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-blue-600">MedFlow</h1>
          <div className="space-x-6 text-sm font-medium">
            <a href="/">Store</a>
            <a href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-md">Admin Portal</a>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <footer className="p-8 bg-slate-50 border-t text-center text-gray-500">
          © 2026 MedFlow Ecosystem. Regulatory Compliant.
        </footer>
      </body>
    </html>
  );
}