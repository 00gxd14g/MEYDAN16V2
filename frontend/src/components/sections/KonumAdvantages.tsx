"use client";
import { DemoOne } from "@/components/ui/demo";

export function KonumAdvantages() {
  return (
    <section id="konum-avantajlar" className="py-10">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <span className="h-1.5 w-36 rounded-full bg-gradient-to-r from-[#9edd84] to-[#347d49] shadow-[0_10px_18px_rgba(9,44,16,0.45)] mb-6"></span>
        <DemoOne />
      </div>
    </section>
  );
}

