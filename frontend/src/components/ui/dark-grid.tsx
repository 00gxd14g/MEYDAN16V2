"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const items = [
  {
    value: "🏢 6",
    label: "Bağımsız Blok",
    desc: "Eşsiz mimari ve çatı GES ile 6 bağımsız blok",
  },
  {
    value: "🏪 35",
    label: "Toplam Dükkan",
    desc: "Gün ışığı alan, modern ve ferah dükkanlar",
  },
  {
    value: "📏 4.5",
    label: "Metre Tavan",
    desc: "4.5 m tavan yüksekliğiyle rahat alışveriş deneyimi",
  },
  {
    value: "📍 4.000",
    label: "m² Kapalı Alan",
    desc: "4000 m² kapalı alan; bölgenin cazibe noktası",
  },
];

export default function Demo() {
  return (
    <div className="w-full bg-transparent text-white">
      <div className="w-full px-0 py-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {items.map(({ value, label, desc }) => (
            <Card
              key={label}
              className="group relative h-[260px] overflow-hidden rounded-lg border-none bg-transparent p-0 transition-colors duration-300 flex flex-col"
            >
              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#9edd84]/12 via-transparent to-transparent" />
              </div>

              {/* faint inner glow that appears on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent to-transparent group-hover:from-[#2e5eaa]/15 group-hover:to-[#9edd84]/12 transition-colors" />

              {/* corner accents removed to avoid hover bleed */}

              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 md:gap-2 px-6 text-center">
                <div className="text-5xl md:text-6xl font-semibold leading-tight text-zinc-50 drop-shadow-[0_16px_28px_rgba(10,20,10,0.5)]">{value}</div>
                <div className="text-xl md:text-2xl uppercase tracking-[0.15em] text-[#9edd84] drop-shadow-[0_10px_20px_rgba(12,24,18,0.48)]">{label}</div>
                <div className="text-lg md:text-xl text-zinc-200/85 leading-snug max-w-[30ch]">
                  {desc}
                </div>
              </div>

              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
