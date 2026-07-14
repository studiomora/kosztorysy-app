import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Nav from "./Nav";

export const metadata: Metadata = {
  title: "Kosztorysy — Brodacze z Lasu",
  description: "Внутрішній застосунок для розрахунку та генерації кошторисів",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-neutral-50 antialiased">
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
