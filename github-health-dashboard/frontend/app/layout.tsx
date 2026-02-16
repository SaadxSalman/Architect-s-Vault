import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GitHub Health Dashboard',
  description: 'Analytics for saadxsalman',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  )
}