"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Watch, Headphones, Tv, Mouse } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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

const bannerImages = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

export default function HomePage() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    drag: true,
    renderMode: "performance",
    created(slider) {
      setInterval(() => {
        slider.next();
      }, 4000);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-4">
      {/* Header with logo centered above brand name */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mt-2 text-center">
          Sai Chetna Mobile & Electronics
        </h1>
         <div className="overflow-hidden h-10 mb-6">
        <div className="overflow-hidden whitespace-nowrap bg-blue-50">
  <div className="animate-marquee inline-block min-w-full px-4 py-2 text-sm sm:text-base text-blue-600 font-medium">
    🔥 Huge Discounts on Vivo & Samsung Phones! | 🎧 Accessories Starting at ₹99 | 🧊 AC & TV Sale Live Now! | Visit Our Showroom Today!
  </div>
</div>
      </div>
      </div>

      <p className="text-center text-lg text-gray-600 mb-6">
        Explore Our First Floor Product Categories
      </p>

      {/* Responsive Banner with fixed height */}
      <div
        ref={sliderRef}
        className="keen-slider max-w-5xl mx-auto mb-10 rounded-xl overflow-hidden shadow-xl"
      >
        {bannerImages.map((src, index) => (
          <div key={index} className="keen-slider__slide">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width={1200}
              height={400}
              className="w-full max-h-[300px] object-cover transition-opacity duration-1000"
            />
          </div>
        ))}
      </div>

      {/* Product Cards */}
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