// app/layout.tsx
"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || parsedUser.email || localStorage.getItem("userName"));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
        setUserName(localStorage.getItem("userName"));
      }
    } else {
      setUserName(localStorage.getItem("userName"));
    }
    setLoading(false);
  }, []);

  const avatar = "👤"; // Generic avatar

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("userGender");
    window.location.href = "/";
  };

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
      <body className="antialiased bg-white text-gray-900 font-satoshi">
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
              <Link href="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
              <Link href="/offers" className="hover:text-blue-600 transition-colors duration-200">Offers</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors duration-200">About</Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors duration-200">Contact</Link>

              {!loading && (
                userName ? (
                  // Desktop Logged-in state: Added Dashboard Link
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full shadow text-blue-700 font-semibold animate-fade-in-up">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 cursor-pointer"> {/* Make the user part clickable */}
                        <div className="w-7 h-7 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs">
                            {avatar}
                        </div>
                        <span className="max-w-[120px] truncate">{userName}</span>
                    </Link>
                    <Link href="/admin/dashboard" className="text-xs text-blue-600 hover:underline transition-colors duration-200 ml-2 py-1 px-2 rounded-full hover:bg-blue-100 active:bg-blue-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Dashboard {/* Explicit Dashboard button */}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-red-500 hover:text-red-600 transition-colors duration-200 ml-2 py-1 px-2 rounded-full hover:bg-red-50 active:bg-red-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <a
                    href="/custom-login/index.html"
                    className="ml-4 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow animate-fade-in-up active:bg-blue-800 transition-colors duration-200"
                  >
                    Login
                  </a>
                )
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 bg-gray-100 text-gray-800 hover:bg-gray-200">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 bg-white text-gray-900 transition-colors duration-300 border-l border-gray-200 shadow-xl">
                  <div className="mt-14 flex flex-col gap-5 text-base font-medium text-gray-700 px-2">
                    <Link href="/" className="py-2 hover:text-blue-600 transition-colors duration-200 border-b border-gray-100">Home</Link>
                    <Link href="/offers" className="py-2 hover:text-blue-600 transition-colors duration-200 border-b border-gray-100">Offers</Link>
                    <Link href="/about" className="py-2 hover:text-blue-600 transition-colors duration-200 border-b border-gray-100">About</Link>
                    <Link href="/contact" className="py-2 hover:text-blue-600 transition-colors duration-200 border-b border-gray-100">Contact</Link>

                    {!loading && (
                      userName ? (
                        // Mobile Logged-in state: Added Dashboard Link
                        <div className="flex flex-col gap-2 mt-4 text-gray-700 bg-gray-100 p-3 rounded-lg shadow-inner animate-fade-in-up">
                            <Link href="/admin/dashboard" className="flex items-center gap-2 cursor-pointer">
                                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center text-xs">
                                    {avatar}
                                </div>
                                <span>{userName}</span>
                            </Link>
                            <Link
                                href="/admin/dashboard"
                                className="text-sm text-blue-600 hover:underline transition-colors duration-200 text-left py-2 px-3 rounded-md hover:bg-blue-50 active:bg-blue-100 active:scale-95"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-500 hover:underline active:text-red-600 transition-colors duration-200 text-left py-2 px-3 rounded-md hover:bg-red-50 active:bg-red-100 active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                      ) : (
                        <a
                          href="/custom-login/index.html"
                          className="mt-6 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition active:bg-blue-800 animate-fade-in-up"
                        >
                          Login
                        </a>
                      )
                    )}
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