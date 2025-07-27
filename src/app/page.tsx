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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center animate-fade-in">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-md px-4">
          Sai Chetna Mobile & Electronics
        </h1>

        {/* Marquee */}
        <div className="overflow-hidden h-10 mt-4 w-full">
          <div className="overflow-hidden whitespace-nowrap bg-blue-200 rounded-full">
            <div className="whitespace-nowrap animate-marquee px-4 text-sm md:text-lg text-blue-800 font-medium">
              🔧 All Spare Parts at Best Prices | 📱 Repair Booking Now Open | 💬 Connect with Nearest Repair Shops Across Cities
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-lg text-gray-700 font-medium mb-6">
        Explore Our Core Services
      </p>

      {/* Banner */}
      <div
        ref={sliderRef}
        className="keen-slider max-w-6xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-2xl border border-blue-200"
      >
        {bannerImages.map((src, index) => (
          <div key={index} className="keen-slider__slide">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width={1200}
              height={400}
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto px-2 animate-fade-up">
        {categories.map((cat, index) => (
          // Added 'group' class to the Link component
          <Link href={cat.link} key={index} className="group block">
            <Card
              className="hover:scale-[1.02] hover:shadow-2xl transition duration-300 ease-in-out bg-white border border-blue-100 rounded-2xl"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                {/* Modified this div to have group-hover styles */}
                <div className="mb-3 p-3 rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors duration-300">
                  {/* Cloned the icon to apply group-hover text color directly to it */}
                  {React.cloneElement(cat.icon, {
                    className: `${cat.icon.props.className} text-blue-700 group-hover:text-white transition-colors duration-300`,
                  })}
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-blue-900 text-center">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4 max-w-sm">
                  {cat.description}
                </p>
                <Button className="w-full">Explore</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}