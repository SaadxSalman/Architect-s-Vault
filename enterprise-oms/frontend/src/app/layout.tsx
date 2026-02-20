"use client";
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '../utils/trpc';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className="bg-slate-950 text-white min-h-screen">
            {children}
          </body>
        </html>
      </QueryClientProvider>
    </trpc.Provider>
  );
}