// components/ui/sheet.tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "bottom" | "left" | "right";
  }
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    {/* ✅ Light transparent overlay with blur */}
    <SheetPrimitive.Overlay className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" />

    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out",
        side === "left" && "left-0 top-0 h-full w-80",
        side === "right" && "right-0 top-0 h-full w-64",
        side === "top" && "top-0 left-0 w-full h-64",
        side === "bottom" && "bottom-0 left-0 w-full h-64",
        className
      )}
      {...props}
    >
      {/* ✅ Close button */}
      <SheetPrimitive.Close className="absolute top-4 right-4">
        <X className="h-5 w-5 text-gray-800" />
      </SheetPrimitive.Close>

      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));

SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };