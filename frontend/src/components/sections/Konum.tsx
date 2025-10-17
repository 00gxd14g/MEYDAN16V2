'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Hospital,
  MapPin,
  Train,
  TrendingUp,
  Users,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: MapPin,
    title: "Merkez Üçgen",
    description:
      "AOS Hastanesi, Timsah Arena ve Acemler Metro'nun buluştuğu noktada.",
  },
  {
    icon: Users,
    title: "1,2 Milyon Ziyaretçi",
    description: "Dükkan önünden ayda ortalama 1,2 milyon yaya geçişi.",
  },
  {
    icon: TrendingUp,
    title: "3 km Çapta 255 Bin",
    description: "Yoğun yerleşim akslarına dakikalar içinde erişim.",
  },
  {
    icon: Building2,
    title: "Kent Aksı",
    description: "Doğu-batı trafiğinin beşte biri doğrudan proje önünden akıyor.",
  },
  {
    icon: Hospital,
    title: "AOS Hastanesi",
    description: "Karşı konumda; günde 45 bin giriş-çıkış.",
  },
  {
    icon: Train,
    title: "Acemler Metro",
    description: "Yalnızca 4 dakikalık yürüyüş, günde 40 bin yolcu.",
  },
  {
    icon: Users,
    title: "Timsah Arena",
    description: "Yılda 24 maç, 1 milyondan fazla futbolsever komşunuz.",
  },
];

export function Konum() {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const update = () => {
      const nextValue = window.innerWidth <= 768 ? 1 : 3;
      setItemsPerView(nextValue);
      setPage(0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(HIGHLIGHTS.length / itemsPerView);
  }, [itemsPerView]);

  const visibleCards = useMemo(() => {
    const cards: typeof HIGHLIGHTS = [];
    for (let i = 0; i < itemsPerView; i += 1) {
      const idx = (page * itemsPerView + i) % HIGHLIGHTS.length;
      cards.push(HIGHLIGHTS[idx]);
    }
    return cards;
  }, [itemsPerView, page]);

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section id="konum" className="section konum-section section-visible" aria-label="Konum">
      <div className="konum-visual">
        <Image
          src="/assets/images/background2.jpg"
          alt="MEYDAN16 konum görseli"
          width={1315}
          height={658}
          className="konum-image"
          priority
          sizes="100vw"
        />
        <div className="konum-overlay">
          <div className="container konum-overlay-content">
            <span className="konum-label">Bursa&apos;nın yeni buluşma noktası</span>
            <h2 className="section-title konum-title">Konum</h2>
            <p className="konum-lead">
              MEYDAN16, şehrin sağlık, spor ve ulaşım arterlerinin kesişiminde yer alır.
              Dükkanınızın önünden ayda ortalama <strong>1,2 milyon kişi</strong> geçer.
            </p>
          </div>
        </div>
      </div>

      <div className="konum-cards-wrapper">
        <div className="container konum-cards-container">
          <div className="konum-separator" aria-hidden="true" />

          <div className="konum-slider">
            <div className="konum-cards" role="list">
              {visibleCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="konum-card" role="listitem" key={item.title}>
                    <div className="konum-card-icon">
                      <Icon />
                    </div>
                    <h3 className="konum-card-title">{item.title}</h3>
                    <p className="konum-card-text">{item.description}</p>
                  </article>
                );
              })}
            </div>

            <div className="konum-slider-controls">
              <button
                type="button"
                className="konum-slider-btn"
                onClick={handlePrev}
                aria-label="Önceki avantajı göster"
              >
                <ChevronLeft />
              </button>
              <span className="konum-slider-counter">
                {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="konum-slider-btn"
                onClick={handleNext}
                aria-label="Sonraki avantajı göster"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
