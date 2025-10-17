import "./globals.css";
import "../../public/styles/style.css";
import "../../public/styles/sections.css";
import "../../public/styles/pages.css";
import "../../public/styles/modal.css";
import "@/styles/style.css"; // small overrides for asset URLs under Next
import NavClient from "@/components/NavClient";
import ScrollClient from "@/components/ScrollClient";
import Script from "next/script";
import Image from "next/image";
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-next-app="1">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="MEYDAN16 - Bursa'nın yeni ticari merkezi. AOS Hastanesi, Timsah Arena ve Acemler Metro üçgeninde modern perakende ve sağlık temalı açık AVM. 35 dükkan, 6 bağımsız blok."
        />
        <meta name="keywords" content="MEYDAN16, Bursa, ticari alan, perakende, sağlık, AVM, dükkan, yatırım, Acemler, AOS Hastanesi, Timsah Arena, BRASCO GRUP" />
        <meta name="author" content="BRASCO GRUP YAPI A.Ş." />
        <title>MEYDAN16 - Şehrin Yeni Meydanı</title>
        <link rel="icon" href="/assets/images/meydan16Logo-correct.png" sizes="any" />

        {/* Fonts via next/font; styles imported in layout */}
      </head>
      <body data-scrollbar="" className={sourceSans.className}>
        {/* Loading screen */}
        <div className="loading-screen" id="loadingScreen">
          <div className="loading-content">
            <Image src="/assets/images/meydan16Logo-correct.png" alt="MEYDAN16" className="loading-logo-img" width={512} height={512} priority />
            <div className="loading-bar-container"><div className="loading-bar"></div></div>
          </div>
        </div>

        {/* App wrapper for crossfade */}
        <div id="appRoot" className="app-root">
          <div className="scroll-progress-bar" id="scrollProgressBar"></div>

          {/* Header & Nav */}
          <header className="header">
            <button className="hamburger-menu" aria-label="Menüyü aç"><span></span><span></span><span></span></button>
          </header>
          <nav className="nav-overlay" id="navOverlay" aria-label="Ana menü">
            <button className="nav-close" id="navClose" aria-label="Menüyü kapat">×</button>
            <div className="nav-content">
              <div className="nav-links">
                <a href="#hero" className="nav-link">Ana Sayfa</a>
                <a href="#konum" className="nav-link">Konum</a>
                <a href="#proje" className="nav-link">Proje</a>
                <a href="#planlar" className="nav-link">Bloklar &amp; Planlar</a>
                <a href="#galeri" className="nav-link">Galeri</a>
                <a href="#iletisim" className="nav-link">İletişim</a>
              </div>
              <div className="nav-cta">
                <a href="#iletisim" className="nav-application-btn nav-link" role="button">Başvuru Formu</a>
              </div>
            </div>
          </nav>

          <NavClient />
          <ScrollClient />
          {children}

          <button className="floating-application-btn" id="floatingApplicationBtn" type="button">
            <span className="floating-label">Başvuru Formu</span>
          </button>

          <footer className="footer">
            <div className="container footer-content">
              <div className="footer-brand">
                <Image src="/assets/images/meydan16Logo-correct.png" alt="MEYDAN16" className="footer-logo" width={512} height={512} />
              <p>MEYDAN16 — Bursa&#39;nın Yeni Meydanı</p>
              </div>
              <div className="footer-nav">
                <a href="#hero">Ana Sayfa</a>
                <a href="#konum">Konum</a>
                <a href="#proje">Proje</a>
                <a href="#planlar">Planlar</a>
                <a href="#galeri">Galeri</a>
                <a href="#iletisim">İletişim</a>
              </div>
              <div className="footer-contact">
                <p>Dikkaldırım Mah. Yeni Stadyum Cad. No:16 T, Osmangazi / Bursa</p>
                <p>E: <a href="mailto:info@meydan16.com.tr">info@meydan16.com.tr</a></p>
              </div>
            </div>
            <div className="footer-bottom"><p>© 2025 BRASCO GRUP YAPI A.Ş. Tüm hakları saklıdır.</p></div>
          </footer>
        </div>

        {/* Original interactions. Ensure the file exists under frontend/public/scripts */}
        <Script src="/scripts/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
