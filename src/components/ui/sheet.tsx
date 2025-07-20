import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "bottom" | "left" | "right";
  }
>(({ side = "right", className, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-white/70 backdrop-blur-md p-4 shadow-lg transition-transform duration-300 ease-in-out",
        "data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out",
        side === "left" && "left-0 top-0 h-full w-80",
        side === "right" && "right-0 top-0 h-full w-64",
        side === "top" && "top-0 left-0 w-full h-64",
        side === "bottom" && "bottom-0 left-0 w-full h-64",
        className
      )}
      {...props}
    />
  </SheetPrimitive.Portal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

export { Sheet, SheetTrigger, SheetContent };