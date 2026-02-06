"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Use state to ensure these are only created once on the client side
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000",
        }),
      ],
    })
  );

  return (
    <html lang="en">
      <body>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {/* Main Navigation Header */}
            <nav className="p-6 border-b border-slate-800 flex justify-between">
              <h1 className="text-2xl font-bold text-blue-400">TechStore</h1>
            </nav>

            {/* Page Content */}
            <main>
              {children}
            </main>
          </QueryClientProvider>
        </trpc.Provider>
      </body>
    </html>
  );
}