// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sai Chetna Mobile & Electronics",
  description: "Your trusted electronics showroom",
  icons: {
    icon: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased font-sans bg-white text-gray-900">
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-1 py-3">
            <Link href="/" className="flex items-center gap-3">
             <Image
                       src="/logo.png"
                       alt="Logo"
                       width={60}
                       height={60}
                       className="rounded-xl ml-2"
                     />
              <span className="text-2xl font-bold text-blue-700 tracking-tight">
                Sai Chetna
              </span>
            </Link>

            <nav className="flex gap-6 text-sm font-medium text-gray-700">
              <Link href="/">Home</Link>
              <Link href="/offers">Offers</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="min-h-screen pt-4">{children}</main>
      </body>
    </html>
  );
}