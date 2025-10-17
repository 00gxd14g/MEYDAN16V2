"use client";
import { useEffect } from "react";

export default function NavClient() {
  useEffect(() => {
    const body = document.body;
    const navOverlay = document.getElementById("navOverlay");
    const navClose = document.getElementById("navClose");
    const hamburger = document.querySelector<HTMLButtonElement>(".hamburger-menu");

    const openNav = () => {
      navOverlay?.classList.add("active");
      hamburger?.classList.add("active");
      body.style.overflow = "hidden";
    };
    const closeNav = () => {
      navOverlay?.classList.remove("active");
      hamburger?.classList.remove("active");
      body.style.overflow = "";
    };

    const toggle = () => {
      if (navOverlay?.classList.contains("active")) closeNav(); else openNav();
    };

    hamburger?.addEventListener("click", toggle);
    navClose?.addEventListener("click", closeNav);
    navOverlay?.addEventListener("click", (e) => { if (e.target === navOverlay) closeNav(); });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && navOverlay?.classList.contains("active")) closeNav(); };
    document.addEventListener("keydown", onKey);

    return () => {
      hamburger?.removeEventListener("click", toggle);
      navClose?.removeEventListener("click", closeNav);
      navOverlay?.removeEventListener("click", (e) => { if (e.target === navOverlay) closeNav(); });
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}

