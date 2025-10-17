"use client";
import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from "react-icons/fi";

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon?: JSX.Element;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  fullWidthMax?: number; // px upper bound when fullWidth
  desktopRatio?: number; // portion of container width on desktop (e.g., 0.7)
  mobileRatio?: number;  // portion of container width on mobile (e.g., 0.92)
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { title: "Text Animations", description: "Cool text animations for your projects.", id: 1, icon: <FiFileText className="h-[16px] w-[16px] text-white" /> },
  { title: "Animations", description: "Smooth animations for your projects.", id: 2, icon: <FiCircle className="h-[16px] w-[16px] text-white" /> },
  { title: "Components", description: "Reusable components for your projects.", id: 3, icon: <FiLayers className="h-[16px] w-[16px] text-white" /> },
  { title: "Backgrounds", description: "Beautiful backgrounds and patterns for your projects.", id: 4, icon: <FiLayout className="h-[16px] w-[16px] text-white" /> },
  { title: "Common UI", description: "Common UI components are coming soon!", id: 5, icon: <FiCode className="h-[16px] w-[16px] text-white" /> },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 } as const;

export const Component = ({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  fullWidth = false,
  fullWidthMax = 1280,
  desktopRatio = 0.7,
  mobileRatio = 0.92,
}: CarouselProps): JSX.Element => {
  const containerPadding = 16;
  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!fullWidth) {
      setMeasuredWidth(null);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const update = () => setMeasuredWidth(el.clientWidth);
    update();
    let ro: ResizeObserver | undefined;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      const roLocal: ResizeObserver = new (window as any).ResizeObserver(update);
      roLocal.observe(el);
      ro = roLocal;
    }
    window.addEventListener('resize', update, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update as any);
    };
  }, [fullWidth]);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const effectiveWidth = fullWidth && measuredWidth
    ? clamp(
        Math.round(measuredWidth * (measuredWidth < 768 ? mobileRatio : desktopRatio)),
        320,
        fullWidthMax
      )
    : baseWidth;
  const itemWidth = effectiveWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) return prev + 1;
          if (prev === carouselItems.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop ? {} : { dragConstraints: { left: -trackItemOffset * (carouselItems.length - 1), right: 0 } };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${round ? "rounded-full border border-white" : "rounded-[24px] border border-[#222]"}`}
      style={{ width: fullWidth ? '100%' : `${baseWidth}px`, ...(round && { height: `${effectiveWidth}px` }) }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselItemCard
            key={index}
            index={index}
            x={x}
            item={item}
            itemWidth={itemWidth}
            round={round}
            effectiveTransition={effectiveTransition}
            trackItemOffset={trackItemOffset}
          />
        ))}
      </motion.div>
      <div className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""}`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${currentIndex % items.length === index ? (round ? "bg-ghost-white" : "bg-raisin-black") : round ? "bg-raisin-black/50" : "bg-raisin-black/30"}`}
              animate={{ scale: currentIndex % items.length === index ? 1.2 : 1 }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ItemCardProps {
  index: number;
  x: MotionValue<number>;
  item: CarouselItem;
  itemWidth: number;
  round: boolean;
  effectiveTransition: any;
  trackItemOffset: number;
}

function CarouselItemCard({ index, x, item, itemWidth, round, effectiveTransition, trackItemOffset }: ItemCardProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });
  return (
    <motion.div
      className={`relative shrink-0 flex flex-col ${round ? "items-center justify-center text-center bg-eerie-black border-0" : "items-center justify-center text-center bg-raisin-black/20 border border-raisin-black/30 rounded-[12px]"} overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{ width: itemWidth, height: round ? itemWidth : "100%", rotateY, ...(round && { borderRadius: "50%" }) }}
      transition={effectiveTransition}
    >
      {item.icon && (
        <div className={`${round ? "p-0 m-0" : "mb-6 p-8"}`}>
          <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#060606]">{item.icon}</span>
        </div>
      )}
      <div className="p-8 text-center">
        <div className="mb-2 font-black text-4xl md:text-6xl text-white leading-tight">{item.title}</div>
        <p className="text-2xl md:text-3xl text-white/90 leading-snug">{item.description}</p>
      </div>
    </motion.div>
  );
}
