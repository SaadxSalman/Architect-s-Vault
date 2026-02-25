'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We keep this to ensure we only run client-specific logic when safe
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // Step 1: Add suppressHydrationWarning to the html tag
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={inter.className} 
        // Step 2: Ensure it is also on the body tag
        suppressHydrationWarning
      >
        {/* Step 3: Avoid the conditional <div> wrap. 
          Just render children directly. 
          The suppressHydrationWarning will handle the extension attributes.
        */}
        {children}
      </body>
    </html>
  );
}