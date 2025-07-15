"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Phone = {
  name: string;
  price: string;
  variants: string;
  specs?: string;
  image: string;
};

const vivoPhones: Phone[] = [
  {
    name: "Vivo X Fold3 Pro",
    price: "₹1,59,999",
    variants: "16GB RAM + 512GB Storage",
    specs: "Foldable AMOLED, Snapdragon 8 Gen 2, 50MP Camera",
    image: "/images/VivoXFold3Pro.jpg",
  },
  {
    name: "Vivo V50e",
    price: "₹28,999 / ₹30,999",
    variants: "8GB RAM + 128GB / 256GB",
    specs: "AMOLED Display, 64MP Main Camera, 5000mAh Battery",
    image: "/images/VivoV50e.jpg",
  },
  {
    name: "Vivo Y19e",
    price: "₹7,999",
    variants: "4GB RAM + 64GB Storage",
    specs: "HD+ Display, Helio G85, 13MP Camera",
    image: "/images/VivoY19e.jpg",
  },
];

export default function VivoPage() {
  const [open, setOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  const handleOpen = (phone: Phone) => {
    setSelectedPhone(phone);
    setOpen(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Vivo Smartphones</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vivoPhones.map((phone, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Image
                src={phone.image}
                alt={phone.name}
                width={200}
                height={200}
                className="mb-4 rounded-md object-contain"
              />
              <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
              <p className="text-gray-700 mb-1">{phone.price}</p>
              <p className="text-sm text-gray-500">{phone.variants}</p>
              <Button onClick={() => handleOpen(phone)} className="mt-4 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPhone && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPhone.name}</DialogTitle>
              <DialogDescription>
                <div className="mt-2 space-y-2">
                  <Image
                    src={selectedPhone.image}
                    alt={selectedPhone.name}
                    width={200}
                    height={200}
                    className="rounded-md mx-auto"
                  />
                  <p><strong>Price:</strong> {selectedPhone.price}</p>
                  <p><strong>Variants:</strong> {selectedPhone.variants}</p>
                  <p><strong>Specifications:</strong> {selectedPhone.specs}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}