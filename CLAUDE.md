# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT USER PREFERENCES:**
- DO NOT create documentation, summaries, or markdown files unless explicitly requested
- Save tokens by avoiding unnecessary reports
- Focus on code implementation only

## Project Overview

MEYDAN16 is a modern commercial real estate development website for BRASCO GRUP. Single-page application with smooth scroll animations, responsive design, and clean navigation.

## Development Commands

```bash
# Install dependencies (required before first run)
npm install

# Start production server on port 3000
npm start

# Start development server with auto-reload (using nodemon)
npm run dev

# Check Node.js version (requires >= 14.0.0)
node --version
```

## Architecture Overview

### Backend Architecture

The application uses a simple Express.js server (`server.js`) that:
- Serves static files from the root directory with 1-day caching
- Routes to HTML pages in `/pages` directory
- Implements security headers via Helmet.js (CSP disabled for inline styles)
- Uses gzip compression for performance
- Handles 404 errors by serving the index page
- Includes graceful shutdown handlers for SIGTERM/SIGINT

### Frontend Architecture

Arayüz tek sayfalık (SPA benzeri) bir yapı kullanır; tüm bölümler `index.html` içinde yer alır ve vanilla JavaScript ile yönetilir:

1. **Navigasyon Sistemi**: Hamburger menü + overlay; anchor bazlı smooth scroll.
2. **Yükleme Ekranı**: 2.2s süren logo animasyonu, ardından gövdeye `loaded` sınıfı eklenir.
3. **Hero Bölümü**: Tam yükseklikli arka plan, optimize edilmiş logo boyutu ve CTA grubu.
4. **Geçiş Bölümü**: Slogan bloğu, IntersectionObserver ile ışık/koyu renk geçişleri yapar.
5. **Scroll Animasyonları**: Bölümler `section-visible` sınıfıyla fade-in olur; progress bar eşlik eder.

### Key Technical Decisions

- **No Build Process**: Proje hâlâ vanilla HTML/CSS/JS ile yönetiliyor; bundler yok.
- **CDN Dependencies**: Google Fonts CDN üzerinden yükleniyor.
- **Express Static Serving**: Tüm içerik `public/` klasöründen servis ediliyor.
- **Single-page Layout**: Ayrı sayfalar kaldırıldı; Express yalnızca `index.html` döndürüyor.
- **CSS Architecture**: `style.css` (global), `sections.css` (bölümler) ve `pages.css` (yardımcı utility) olarak sadeleştirildi.

## File Structure & Responsibilities

```
/server.js                    # Express server, routing, middleware
/public/index.html            # Tek sayfalı uygulama (hero, tüm içerik bölümleri, footer)
/public/scripts/script.js     # Navigasyon, IntersectionObserver, formlar
/public/styles/style.css      # Global temalar, header/hero, tasarım belirteçleri
/public/styles/sections.css   # Konum, proje, planlar, portföy, müsaitlik vb. bölümler
/public/styles/pages.css      # Yardımcı sınıflar (.section-stack, .badge, .text-muted)
/public/assets/images/        # Proje görselleri ve logolar
```

## Critical Implementation Details

### Navigation Implementation
- `hamburger-menu` butonu overlay menüsünü açar, `navOverlay` kapatılırken gövde kaydırması kilitlenir.
- `.nav-link`, footer bağlantıları ve CTA butonları anchor bazlı `smoothScrollTo` yardımcı fonksiyonunu kullanır.
- ESC tuşu veya overlay üzerine tıklamak menüyü kapatır.

### Animation System
- Yükleme ekranı kademeli olarak kapanır, ardından `body.loaded` set edilir.
- `.section` öğeleri IntersectionObserver ile `section-visible` sınıfını alır (fade-in).
- `.transition-section` bileşenleri görünürlükte sırayla `light-mode`/`dark` durumları arasında geçiş yapar.
- Scroll ilerleme çubuğu (`#scrollProgressBar`) her scroll’da güncellenir.

### Responsive Breakpoints
- ≥1080px: Geniş masaüstü düzeni, çift kolon hero.
- 768–1080px: Container padding daraltılır, gridler tek sütuna yaklaşır.
- ≤768px: Hero tek sütuna düşer, konum görseli içerik altında görüntülenir.
- ≤600px: Konum arka planı mobil görsele geçer, filtre butonları tam genişlik.

## Common Development Tasks

### Tek Sayfa İçine Yeni Bölüm Eklemek
1. `public/index.html` içinde yeni `<section id="...">` bloğu ekleyin ve `.section` sınıfını kullanın.
2. Navigasyondan erişilecekse `navOverlay` üzerindeki `.nav-link` listesine yeni anchor ekleyin.
3. Gerekli stilleri `public/styles/sections.css` dosyasına ekleyin.

### Hero İçeriğini Güncellemek
Hero, `#hero.hero-section` bloğunda yer alır:
- Logo `.hero-logo`, maksimum 512px genişlik ve `transform: scale(1.56)` ile ölçeklenir.
- Başlık `.hero-heading` üç satırdan oluşur, font-weight 300’dür.
- CTA grubu `.hero-cta-group` içinde tanımlıdır.

### Stil Güncellemeleri
- Global temalar ve navigasyon: `public/styles/style.css`
- Bölümsel bileşenler (konum, portföy, müsaitlik, formlar): `public/styles/sections.css`
- Yardımcı sınıflar: `public/styles/pages.css`

### Performans Notları
- Statik dosyalar 1 gün cache (Express `express.static` ayarı).
- `compression` ve `helmet` orta katmanları etkindir.
- Animasyonlar `transform` / `opacity` üzerinde çalışır, IntersectionObserver ile tetiklenir.

## Turkish Language Context

The project is in Turkish for a Bursa-based real estate development. Key terms:
- "Şehrin Yeni Meydanı" = "The City's New Square"
- "Hakkımızda" = "About Us"
- "Projeler" = "Projects"
- "Bloklar & Planlar" = "Blocks & Plans"
- "İletişim" = "Contact"

## Contact Information (Production)
- Company: BRASCO GRUP YAPI A.Ş.
- Address: Dikkaldirim Mah., Osmangazi, Bursa
- Phone: 0224 234 56 78
- Email: info@brascogrup.com
