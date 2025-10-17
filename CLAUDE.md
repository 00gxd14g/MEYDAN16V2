# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT USER PREFERENCES:**
- DO NOT create documentation, summaries, or markdown files unless explicitly requested
- Save tokens by avoiding unnecessary reports
- Focus on code implementation only

## Project Overview

MEYDAN16 is a modern commercial real estate development website for BRASCO GRUP built with Next.js 15 and React 18. It's a Turkish-language single-page application showcasing "Şehrin Yeni Meydanı" (The City's New Square) in Bursa, featuring smooth scroll animations, responsive design, and a hybrid architecture combining modern React patterns with preserved legacy styling.

## Development Commands

```bash
# From project root (MEYDAN16V2/)
npm install              # Install all dependencies
npm run dev             # Start Next.js dev server with hot reload (port 3000)
npm run build           # Create production build
npm start               # Start production server
npm run lint            # Run ESLint with Next.js config

# Alternative: run from frontend directory
cd frontend
npm install
npm run dev             # Development server
npm run build           # Production build
npm start               # Production server
```

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15.5.6 with App Router (modern architecture)
- **UI Library**: React 18.2.0
- **Language**: TypeScript 5.4.0 with strict mode
- **Styling**: Hybrid approach - Tailwind CSS 3.4 + preserved legacy CSS design system
- **Animation**: Framer Motion 11.0.0 for carousel and transitions
- **Icons**: Lucide React + React Icons
- **Build**: Next.js handles everything (no manual webpack config needed)

### Frontend Architecture

The application is a hybrid Next.js/React app with preserved legacy elements:

1. **Component Structure**:
   - `src/app/` - Next.js App Router with server/client components
   - `src/components/ui/` - Reusable UI components (carousel, gallery, grid)
   - `src/components/sections/` - Page sections (Hero, Konum, Proje, etc.)
   - Mix of Server Components (layout) and Client Components ('use client' for interactivity)

2. **Rendering Strategy**:
   - Single main page (`src/app/page.tsx`) with all sections
   - Anchor-based smooth scrolling between sections
   - Server-side rendering for initial load, client-side interactions after hydration

3. **Styling System**:
   - Design tokens via CSS custom properties (colors, spacing, shadows)
   - Legacy CSS preserved in `public/styles/` (2,220 lines total)
   - Tailwind configured but minimally used (mostly in carousel component)
   - Responsive breakpoints: Desktop (≥1080px), Tablet (768-1080px), Mobile (≤768px)

4. **Animation System**:
   - Loading screen with 2.2s timeout before content display
   - IntersectionObserver triggers fade-in animations on scroll
   - Framer Motion powers carousel interactions
   - Scroll progress bar and floating CTA visibility

5. **API Layer**:
   - `/api/contact` endpoint for form submissions (Next.js API Routes)
   - JSON responses with validation
   - No database persistence currently

### Key Technical Decisions

- **Hybrid Legacy/Modern Approach**: Next.js 15 framework while preserving original CSS design system and vanilla JS interactions
- **No Component Library**: Custom components built from scratch, no shadcn/ui or similar
- **Client-Side Interactivity**: Isolated to `NavClient.tsx` and `ScrollClient.tsx` components
- **Legacy JavaScript Integration**: `public/scripts/script.js` (634 lines) handles modals, forms, and legacy interactions
- **Performance Optimizations**: Next.js Image component, lazy loading, IntersectionObserver for animations

## File Structure & Responsibilities

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                 # Main page with all sections (use client)
│   │   ├── layout.tsx               # Root layout (nav, footer)
│   │   ├── globals.css              # Tailwind directives + base styles
│   │   └── api/contact/route.ts     # Contact form API endpoint
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── carousel.tsx         # Framer Motion carousel
│   │   │   ├── rolling-gallery.tsx  # Auto-scrolling gallery
│   │   │   └── dark-grid.tsx        # Project metrics grid
│   │   ├── sections/                # Page sections
│   │   │   ├── Hero.tsx            # Hero section with CTA
│   │   │   ├── Konum.tsx           # Location section
│   │   │   ├── Proje.tsx           # Project details
│   │   │   ├── Planlar.tsx         # Block plans (A-F)
│   │   │   ├── Galeri.tsx          # Image gallery
│   │   │   └── Iletisim.tsx        # Contact form
│   │   ├── NavClient.tsx            # Client-side navigation
│   │   └── ScrollClient.tsx         # Scroll interactions
│   └── lib/
│       └── utils.ts                 # Utility functions
├── public/
│   ├── assets/images/               # Static images
│   │   └── blok-planları/          # Block plan images (A-F)
│   ├── styles/                      # Legacy CSS (preserved)
│   │   ├── style.css                # Global styles (767 lines)
│   │   ├── sections.css             # Section styles (1,197 lines)
│   │   ├── pages.css                # Utilities (31 lines)
│   │   └── modal.css                # Modal styles (225 lines)
│   └── scripts/
│       └── script.js                # Legacy vanilla JS (634 lines)
├── package.json                     # Dependencies & scripts
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind configuration
└── tsconfig.json                    # TypeScript config
```

## Critical Implementation Details

### Hybrid Legacy/Modern Integration

The project uniquely combines Next.js 15 with preserved legacy code:

1. **React Components + Legacy CSS**: React components use legacy CSS classes from `public/styles/`
2. **Client Components + Vanilla JS**: `public/scripts/script.js` runs alongside React for modals, forms
3. **Two Navigation Systems**: `NavClient.tsx` (React) and legacy JS both handle navigation
4. **Mixed Animation Approaches**: Framer Motion for carousel, vanilla JS for scroll animations

### Navigation Implementation
- **React Side** (`NavClient.tsx`): Hamburger menu toggle, overlay management
- **Legacy Side** (`script.js`): Smooth scroll functions, anchor link handling
- Both systems coexist and work together for complete functionality

### Animation System
- Loading screen: 2.2s timer in legacy JS, then `body.loaded` class added
- Section animations: IntersectionObserver in legacy JS adds `section-visible` class
- Carousel: Framer Motion with drag gestures and auto-play
- Scroll progress: Legacy JS updates `#scrollProgressBar` width on scroll

### CSS Architecture
- **Design Tokens**: CSS custom properties in `:root` (colors, spacing, shadows)
- **Legacy Styles**: 2,220 lines across 4 files in `public/styles/`
- **Tailwind**: Configured but minimally used (mainly in carousel component)
- **Specificity**: Legacy CSS takes precedence due to load order

### Responsive Breakpoints
- ≥1080px: Desktop layout with 2-column hero
- 768–1080px: Tablet with adjusted padding
- ≤768px: Mobile single column
- ≤600px: Compact mobile with full-width buttons

## Common Development Tasks

### Adding a New Section
1. Create a new component in `frontend/src/components/sections/`
2. Import and add to `frontend/src/app/page.tsx`
3. Add navigation link in `frontend/src/app/layout.tsx` if needed
4. Style with Tailwind classes or add to legacy CSS files

### Modifying Components
- **React Components**: Edit files in `frontend/src/components/`
- **Legacy Styles**: Modify `frontend/public/styles/*.css` files
- **Legacy JS**: Update `frontend/public/scripts/script.js` for modal/form logic

### Working with the Hybrid System
When making changes, consider both systems:
1. React components may depend on legacy CSS classes
2. Legacy JS may need updates when adding new interactive elements
3. Test both React interactions and vanilla JS functionality
4. Ensure CSS load order preserves legacy styling

### API Development
Contact form endpoint: `frontend/src/app/api/contact/route.ts`
- Uses Next.js Route Handlers (not Pages API)
- Add new endpoints in `frontend/src/app/api/` directory

### Image Optimization
- Use Next.js `<Image>` component for new images
- Configure remote patterns in `next.config.js` for external images
- Static images go in `frontend/public/assets/images/`

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
