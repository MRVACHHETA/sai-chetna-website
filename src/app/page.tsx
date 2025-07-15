"use client";

import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Watch,
  Headphones,
  Tv,
  Mouse,
} from "lucide-react"; // ✅ Removed Refrigerator

const categories = [
  {
    name: "Smartphones",
    icon: <Phone className="w-6 h-6" />,
    description: "Vivo, Oppo, Redmi, Tecno, Infinix, Realme, Samsung",
    link: "/products/smartphones/vivo",
  },
  {
    name: "Watches",
    icon: <Watch className="w-6 h-6" />,
    description: "Fire-Boltt, Boult, Noise, Local brands",
    link: "#",
  },
  {
    name: "Keypad Phones",
    icon: <Phone className="w-6 h-6" />,
    description: "Itel, Lava, Nokia, MJPhone, Local brands",
    link: "#",
  },
  {
    name: "Accessories",
    icon: <Headphones className="w-6 h-6" />,
    description: "Covers, Glass, USB Cables, Neckbands, Speakers, Power Banks",
    link: "#",
  },
  {
    name: "Home Appliances",
    icon: <Tv className="w-6 h-6" />,
    description: "TVs, Refrigerators, Fans, Mixers, ACs",
    link: "#",
  },
  {
    name: "Computer Accessories",
    icon: <Mouse className="w-6 h-6" />,
    description: "Mouse & basic accessories",
    link: "#",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-blue-700">
        Sai Chetna Mobile & Electronics
      </h1>
      <p className="text-center text-base sm:text-lg text-gray-600 mb-10">
        First Floor Product Categories
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition duration-300 bg-white border border-blue-100"
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="mb-3 text-blue-600">{cat.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center text-blue-800">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {cat.description}
              </p>
              {cat.link !== "#" ? (
                <Link href={cat.link} className="w-full">
                  <Button className="w-full">View Products</Button>
                </Link>
              ) : (
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}