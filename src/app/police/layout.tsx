import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Police Guidelines | Field Reference",
  description:
    "A searchable reference of policing standard operating procedures and guidelines.",
};

export default function PoliceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-900 text-white">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
            <Link href="/police" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <Shield className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-wide">
                  Police Guidelines
                </span>
                <span className="block text-[11px] text-slate-400">
                  Field Reference
                </span>
              </span>
            </Link>
            <nav className="hidden gap-6 text-sm text-slate-300 sm:flex">
              <Link href="/police" className="hover:text-white">
                Home
              </Link>
              <Link href="/police#categories" className="hover:text-white">
                Categories
              </Link>
              <Link href="/police/search" className="hover:text-white">
                Search
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500">
            <p>
              Reference material for training and educational use only. This is
              not legal advice and is not tied to any specific jurisdiction.
              Always follow your service&apos;s current policies and the law.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
