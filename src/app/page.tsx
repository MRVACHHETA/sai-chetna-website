"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Settings } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const categories = [
  {
    name: "Mobile Spare Parts",
    icon: <Settings className="w-6 h-6" />,
    description: "Combo, Frame, Charging Pin, Motherboard & More",
    link: "/products/spare-parts",
  },
  {
    name: "Repair Services",
    icon: <Wrench className="w-6 h-6" />,
    description: "Screen, Battery, Water Damage, Audio, Mic, and More",
    link: "/services/repair-booking",
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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-800 mt-2 px-4 break-words">
          Sai Chetna Mobile & Electronics
        </h1>

        {/* Marquee */}
        <div className="overflow-hidden h-10 mb-6 w-full">
          <div className="overflow-hidden whitespace-nowrap bg-blue-50">
            <div className="whitespace-nowrap animate-marquee px-4 text-sm md:text-lg text-blue-600 font-medium">
              🔧 All Spare Parts at Best Prices | 📱 Repair Booking Now Open | 💬 Connect with Nearest Repair Shops Across Cities
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-lg text-gray-600 mb-6">
        Explore Our Core Services
      </p>

      {/* Banner */}
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
  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-cover"
/>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map((cat, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition duration-300 bg-white border border-blue-100"
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="mb-3 text-blue-600">{cat.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {cat.description}
              </p>
              <Link href={cat.link} className="w-full">
                <Button className="w-full">Explore</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}