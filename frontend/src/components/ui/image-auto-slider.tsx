"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const RENDER_IMAGES = [
  "/assets/images/Render/1a8ff67b-e113-482a-b393-3e7c6319fdf2.jpg",
  "/assets/images/Render/3df2ff7d-7e4f-4980-a9b3-7bec754604d6.jpg",
  "/assets/images/Render/449a4b28-d13a-417e-a4fa-b307712ba845.jpg",
  "/assets/images/Render/44d9a2de-ad57-4276-88d8-ede81a0fa66f.jpg",
  "/assets/images/Render/556dce82-b177-4519-a957-bb470dbca5fb.jpg",
  "/assets/images/Render/61ecfd17-0ce2-49a9-8cc6-f36e845dff6e.jpg",
  "/assets/images/Render/83bc223d-afb0-4201-8300-426cddcd8664.jpg",
  "/assets/images/Render/8c3ea3c4-bf09-44dd-89f7-f8a08f388615.jpg",
  "/assets/images/Render/90d8e9fe-b125-463b-ad34-34dcc512a46c.jpg",
  "/assets/images/Render/921608db-efad-4ea6-8741-fffb689376ee.jpg",
  "/assets/images/Render/960d3b60-046d-48c2-9c8a-50f656f9d8e4.jpg",
  "/assets/images/Render/a53888c4-b29a-4a70-822c-a4ef348ae8c8.jpg",
];

export const Component = ({ images = RENDER_IMAGES }: { images?: string[] }) => {
  const list = useMemo(() => [...images, ...images, ...images], [images]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(320); // px; computed after mount

  useEffect(() => {
    const el = trackRef.current?.querySelector<HTMLElement>(".image-item");
    if (el) setStep(Math.max(240, Math.round(el.getBoundingClientRect().width + 16))); // include gap
  }, []);

  useEffect(() => {
    let raf = 0;
    const speed = 0.7; // px per frame
    const tick = () => {
      const vp = viewportRef.current;
      const tr = trackRef.current;
      if (vp && tr) {
        if (!paused) {
          vp.scrollLeft += speed;
          const loopWidth = tr.scrollWidth / 3;
          if (vp.scrollLeft >= loopWidth) vp.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const scrollByStep = (dir: 1 | -1) => {
    const vp = viewportRef.current;
    if (!vp) return;
    setPaused(true);
    vp.scrollBy({ left: dir * step, behavior: 'smooth' });
    setTimeout(() => setPaused(false), 1500);
  };

  return (
    <div className="w-full relative">
      <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div ref={viewportRef} className="w-full overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-4 px-2 py-2">
            {list.map((image, index) => (
              <div
                key={index}
                className="image-item relative flex-shrink-0 rounded-xl overflow-hidden shadow-2xl w-[36rem] h-[24rem] md:w-[72rem] md:h-[48rem]"
                title={`Render ${(index % images.length) + 1}`}
              >
                <Image
                  src={image}
                  alt={`Render ${(index % images.length) + 1}`}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 1152px, 576px"
                  quality={100}
                  className="object-cover"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <button type="button" aria-label="Önceki" onClick={() => scrollByStep(-1)} className="pointer-events-auto h-10 w-10 rounded-full bg-white/15 text-white">‹</button>
        <button type="button" aria-label="Sonraki" onClick={() => scrollByStep(1)} className="pointer-events-auto h-10 w-10 rounded-full bg-white/15 text-white">›</button>
      </div>
    </div>
  );
};
