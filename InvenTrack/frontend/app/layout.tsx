// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar'; // Adjust path based on your alias

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Inventory Pro',
  description: 'Manage your stock efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}