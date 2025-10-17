"use client";
import { useEffect } from "react";

export default function ScrollClient() {
  useEffect(() => {
    const body = document.body;
    const navOverlay = document.getElementById("navOverlay");
    const hamburger = document.querySelector<HTMLButtonElement>(".hamburger-menu");
    const closeNav = () => {
      navOverlay?.classList.remove("active");
      hamburger?.classList.remove("active");
      body.style.overflow = "";
    };

    const smoothScroll = (selector: string) => {
      if (!selector || selector === "#") return;
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const links = document.querySelectorAll<HTMLAnchorElement>(".nav-link, .footer-nav a, .floating-application-btn");
    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href") || (a.dataset && (a as any).dataset.href) || "";
      if (href.startsWith("#")) {
        e.preventDefault();
        smoothScroll(href);
        closeNav();
      }
    };
    links.forEach((l) => l.addEventListener("click", onClick));
    return () => links.forEach((l) => l.removeEventListener("click", onClick));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }

    const slogans = Array.from(document.querySelectorAll<HTMLElement>(".transition-slogan"));
    if (!slogans.length) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("has-slogan-animations");

    const updateShift = () => {
      const viewportHeight = window.innerHeight || 1;
      slogans.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(Math.max(1 - rect.top / viewportHeight, 0), 1);
        const offset = (0.5 - progress) * 16; // keeps movement subtle
        el.style.setProperty("--slogan-shift", offset.toFixed(2));
      });
    };

    let raf = 0;
    const scheduleUpdate = () => {
      if (raf !== 0) return;
      raf = window.requestAnimationFrame(() => {
        updateShift();
        raf = 0;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("is-visible");
          } else {
            target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.35 },
    );

    slogans.forEach((el) => observer.observe(el));

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      root.classList.remove("has-slogan-animations");
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
    };
  }, []);

  return null;
}
