import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'High-Speed Crypto Tool',
  description: 'Node.js + Rust Performance Demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900`}>{children}</body>
    </html>
  );
}