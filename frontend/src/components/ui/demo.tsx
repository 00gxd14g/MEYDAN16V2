"use client";
import { Component, type CarouselItem } from "@/components/ui/carousel";

const items: CarouselItem[] = [
  { id: 1, title: "Merkez Üçgen", description: "AOS Hastanesi, Timsah Arena ve Acemler Metro'nun tam ortasında." },
  { id: 2, title: "Yaya Trafiği", description: "Dükkan önünden ayda 1.2 milyon kişi geçiş potansiyeli." },
  { id: 3, title: "Hızlı Erişim", description: "3 km çapta 255 bin nüfusa hızlı erişim." },
  { id: 4, title: "Kent Aksı", description: "Doğu-batı trafiğinin 1/5'i üzerinde, hayatın merkezinde." },
  { id: 5, title: "AOS Hastanesi", description: "Günde ~45bin giriş-çıkış; karşı konumda." },
  { id: 6, title: "Acemler Metro", description: "Günde ~40 bin yolcu; 4 dk yürüme." },
  { id: 7, title: "BBB Stadyumu Timsah Arena", description: "Yılda 24 maç, 1M+ futbolseverle komşu." },
];

const DemoOne = () => {
  return (
    <Component
      items={items}
      baseWidth={300}
      autoplay={true}
      autoplayDelay={3000}
      pauseOnHover={true}
      loop={true}
      round={false}
      fullWidth={true}
      fullWidthMax={1280}
      desktopRatio={1.0}
      mobileRatio={1.0}
    />
  );
};

export { DemoOne };
