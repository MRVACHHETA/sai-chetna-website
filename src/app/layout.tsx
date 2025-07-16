// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// ✅ Using LOCAL fonts from `geist` package (not Google Fonts)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* ✅ Required for PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}