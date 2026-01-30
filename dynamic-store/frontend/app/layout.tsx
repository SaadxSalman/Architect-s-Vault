import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="fixed top-0 z-[-1] h-full w-full bg-[#0a0a0a]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              SAADXSALMAN <span className="text-white/50 font-light">| DYNAMIC</span>
            </span>
            <div className="flex gap-6 text-sm font-medium text-white/70">
              <button className="hover:text-blue-400 transition-colors">Market</button>
              <button className="hover:text-blue-400 transition-colors">Analytics</button>
              <div className="h-4 w-[1px] bg-white/20 my-auto" />
              <button className="bg-blue-600 px-4 py-1.5 rounded-full text-white text-xs hover:bg-blue-500 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}