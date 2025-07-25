"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function RepairBookingPage() {
  // const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [pickup, setPickup] = useState(true);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [issue, setIssue] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [repairType, setRepairType] = useState<"only-part" | "repair-plus-part">("repair-plus-part");
  const [services, setServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("⚠️ Please accept the charges before submitting.");
      return;
    }

    const bookingData = {
      name,
      mobile,
      city,
      address: pickup ? address : "Visit Shop",
      pincode: pickup ? pincode : "N/A",
      issue,
      services,
      pickup,
      repairType,
      agreed,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("repairBookings") || "[]");
    existing.push(bookingData);
    localStorage.setItem("repairBookings", JSON.stringify(existing));

    alert("✅ Repair request submitted successfully!");

    setName("");
    setMobile("");
    setCity("");
    setPickup(true);
    setAddress("");
    setPincode("");
    setIssue("");
    setServices([]);
    setRepairType("repair-plus-part");
    setAgreed(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-2xl space-y-8">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 drop-shadow-md">
        📱 Book Your Mobile Repair
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              required
            />
          </div>
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>City</Label>
            <Select value={city} onValueChange={setCity} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                <SelectItem value="Surat">Surat</SelectItem>
                <SelectItem value="Rajkot">Rajkot</SelectItem>
                <SelectItem value="Vadodara">Vadodara</SelectItem>
                <SelectItem value="Bhavnagar">Bhavnagar</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block mb-2">Service Type</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={repairType === "only-part" ? "default" : "outline"}
                onClick={() => setRepairType("only-part")}
              >
                Only Part
              </Button>
              <Button
                type="button"
                variant={repairType === "repair-plus-part" ? "default" : "outline"}
                onClick={() => setRepairType("repair-plus-part")}
              >
                Repair + Part
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label className="block mb-2">Common Issues</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Screen Repair",
              "Battery Replacement",
              "Charging Port",
              "Speaker/Mic Issue",
              "Camera Fault",
              "Water Damage",
            ].map((service) => (
              <div key={service} className="flex items-center gap-2">
                <Checkbox
                  id={service}
                  checked={services.includes(service)}
                  onCheckedChange={() => toggleService(service)}
                />
                <Label htmlFor={service}>{service}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="block mb-2">Pickup Option</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={pickup ? "default" : "outline"}
              onClick={() => setPickup(true)}
            >
              Home Pickup
            </Button>
            <Button
              type="button"
              variant={!pickup ? "default" : "outline"}
              onClick={() => setPickup(false)}
            >
              I will visit showroom
            </Button>
          </div>
        </div>

        {pickup && (
          <>
            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full address with landmark"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                pattern="[0-9]{6}"
                placeholder="e.g. 380001"
                required
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="issue">Describe Other Issues</Label>
          <Textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            rows={4}
            placeholder="e.g. Phone not turning on"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(!!v)}
          />
          <Label htmlFor="agree">
            I agree to ₹50 checking + delivery charges
          </Label>
        </div>

        <Button type="submit" className="w-full text-lg py-6" disabled={!agreed}>
          ✅ Submit Repair Request
        </Button>
      </form>
    </div>
  );
}