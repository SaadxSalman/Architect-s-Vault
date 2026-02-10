"use client";
import "./global.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCProxyClient } from "@trpc/client";
import { ipcLink } from "electron-trpc/renderer";
import type { AppRouter } from "../../backend/main";

// Initialize tRPC Proxy for the Frontend
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen border-t-4 border-blue-500">
            <nav className="p-4 bg-slate-900 border-b border-slate-800">
              <h1 className="text-xl font-bold text-blue-400">Fat Client Dashboard</h1>
            </nav>
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}