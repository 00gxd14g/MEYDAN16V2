"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useAnimation, PanInfo } from "framer-motion";

const DEFAULT_LOCAL_IMAGES: string[] = [
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

export interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
  height?: number; // px height of the gallery area
}

export const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = true,
  pauseOnHover = true,
  images,
  height = 420,
}) => {
  const galleryImages = useMemo(() => (images && images.length > 0 ? images : DEFAULT_LOCAL_IMAGES), [images]);

  const [isSm, setIsSm] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth <= 640 : false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsSm(window.innerWidth <= 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Geometry
  const faceCount: number = galleryImages.length;
  const desiredFaceWidth = isSm ? 340 : 260; // mobile larger (≈ x2), desktop optimized
  const separationFactor = 0.9; // 90% of arc length => small gap, no overlap
  const cylinderWidth: number = Math.ceil((desiredFaceWidth * faceCount) / separationFactor);
  const faceWidth: number = desiredFaceWidth;
  const faceHeight: number = Math.max(120, Math.round(faceWidth * 9 / 16)); // 16:9 ratio
  const radius: number = cylinderWidth / (2 * Math.PI);
  const containerHeight: number = Math.max(height, faceHeight + 48);

  // Motion
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: { duration: 24, ease: "linear", repeat: Infinity },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const current = rotation.get();
      startInfiniteSpin(current);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, controls, rotation]);

  const handleUpdate = (latest: any) => {
    if (typeof latest.rotateY === "number") rotation.set(latest.rotateY);
  };

  const dragFactor = 0.05;
  const stepAngle = 360 / faceCount;
  const goNext = () => {
    controls.stop();
    const target = rotation.get() - stepAngle;
    controls.start({ rotateY: target, transition: { duration: 0.45, ease: "easeOut" } });
  };
  const goPrev = () => {
    controls.stop();
    const target = rotation.get() + stepAngle;
    controls.start({ rotateY: target, transition: { duration: 0.45, ease: "easeOut" } });
  };
  const handleDrag = (_: any, info: PanInfo) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };
  const handleDragEnd = () => {
    if (autoplay) startInfiniteSpin(rotation.get());
  };

  // Lightbox
  const [active, setActive] = useState<string | null>(null);
  const close = () => setActive(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (active) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div className="relative group w-full overflow-hidden" style={{ height: containerHeight }}>

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={() => autoplay && pauseOnHover && controls.stop()}
          onMouseLeave={() => autoplay && pauseOnHover && startInfiniteSpin(rotation.get())}
          animate={controls}
          onUpdate={handleUpdate}
          style={{ rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
          className="flex cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="absolute p-0 [backface-visibility:hidden]"
              style={{ width: `${faceWidth}px`, height: `${faceHeight}px`, transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`, transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-full w-full rounded-[12px] border border-white/70 overflow-hidden">
                <Image
                  src={url}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  sizes={`${Math.round(faceWidth)}px`}
                  quality={100}
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform"
                  onClick={() => setActive(url)}
                  style={{ cursor: 'zoom-in' }}
                  priority={i < 2}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation controls (visible on hover desktop, always visible on mobile) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 sm:px-4">
        <button
          type="button"
          aria-label="Önceki"
          onClick={goPrev}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition md:opacity-0 md:group-hover:opacity-100"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Sonraki"
          onClick={goNext}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition md:opacity-0 md:group-hover:opacity-100"
        >
          ›
        </button>
      </div>

      {active && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/90" role="dialog" aria-modal="true" onClick={close}>
          <div className="relative h-[92vh] w-[92vw] max-w-[1200px]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-3 top-3 h-10 w-10 rounded-full bg-white/15 text-white" aria-label="Kapat" onClick={close}>×</button>
            <img src={active} alt="Tam boy görüntü" className="h-full w-full object-contain" />
            <a className="absolute bottom-3 right-3 rounded-md bg-white/15 px-3 py-2 text-sm text-white" href={active} target="_blank" rel="noopener noreferrer">Orijinali Aç</a>
          </div>
        </div>
      )}
    </div>
  );
};
