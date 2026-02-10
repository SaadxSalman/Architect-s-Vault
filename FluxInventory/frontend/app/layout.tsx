import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fat Client Dashboard',
  description: 'Electron + Next.js + Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden">{children}</body>
    </html>
  );
}