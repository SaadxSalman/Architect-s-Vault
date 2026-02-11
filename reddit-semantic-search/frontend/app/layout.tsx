import type { Metadata } from "next";
import "../global.css";

export const metadata: Metadata = {
  title: "Semantic Reddit Search",
  description: "Search r/movies by meaning, not just keywords.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased">{children}</body>
    </html>
  );
}