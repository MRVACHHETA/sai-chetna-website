import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";

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
      <body className="antialiased bg-white text-gray-900">
        <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={60}
                className="rounded-xl"
              />
              <span className="text-2xl font-bold text-blue-700 tracking-tight whitespace-nowrap">
                Sai Chetna
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-gray-700">
              <Link href="/">Home</Link>
              <Link href="/offers">Offers</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>

              {/* Login Button */}
              <a
                href="/custom-login/index.html"
                className="ml-4 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow"
              >
                Login
              </a>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger>
                  <Menu className="h-6 w-6 text-gray-800" />
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="mt-14 flex flex-col gap-5 text-base font-medium text-gray-700 px-2">
                    <Link href="/">Home</Link>
                    <Link href="/offers">Offers</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <a
                      href="/custom-login/index.html"
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
                    >
                      Login
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="min-h-screen pt-4">{children}</main>
      </body>
    </html>
  );
}