# MEYDAN16 - Image Naming Convention & Folder Structure

## Folder Structure

```
/public/assets/images/
├── gallery/              # Proje galeri görselleri
├── blocks/               # Blok plan ve görselleri
├── renders/              # 3D render görselleri
├── floor-plans/          # Kat planları ve teknik çizimler
├── sliders/
│   └── project-plans/    # Proje planı slider görselleri (placeholder dahil)
├── backgrounds/          # Arka plan görselleri
└── logos/                # Logo dosyaları
```

## Naming Convention Rules

### General Rules
- **Lowercase only**: Tüm dosya isimleri küçük harf kullanmalı
- **Hyphens for separation**: Kelimeler arası tire (-) kullanılmalı
- **No spaces or special characters**: Boşluk veya özel karakter kullanılmamalı
- **Sequential numbering**: Aynı kategoride birden fazla görsel için 01, 02, 03 şeklinde numaralandırma
- **Descriptive naming**: İsim görselin içeriğini açık şekilde tanımlamalı

### File Extensions
- `.jpg` - Fotoğraflar ve render'lar için
- `.png` - Logolar, planlar ve şeffaf arka plan gerektiren görseller için
- `.webp` - Web optimizasyonlu görseller için (opsiyonel)

## Category-Specific Naming

### 1. Gallery Images (`/gallery/`)
```
exterior-01.jpg         # Dış cephe görselleri
exterior-02.jpg
interior-01.jpg         # İç mekan görselleri
interior-02.jpg
landscape-01.jpg        # Peyzaj görselleri
night-view-01.jpg       # Gece görünümü
aerial-01.jpg           # Havadan görünüm
plaza-01.jpg            # Meydan görünümü
entrance-01.jpg         # Giriş görselleri
```

### 2. Block Images (`/blocks/`)
```
block-a-plan.png        # A Blok kat planı
block-a-render.jpg      # A Blok render
block-a-facade.jpg      # A Blok cephe görünümü
block-b-plan.png
block-c-plan.png
block-d-plan.png
block-e-plan.png
block-f-plan.png
```

### 3. Renders (`/renders/`)
```
render-aerial-01.jpg    # Havadan render
render-aerial-02.jpg
render-street-01.jpg    # Sokak seviyesi render
render-plaza-01.jpg     # Meydan render
render-interior-01.jpg  # İç mekan render
render-night-01.jpg     # Gece render
render-sunset-01.jpg    # Gün batımı render
```

### 4. Floor Plans (`/floor-plans/`)
```
site-plan.png           # Vaziyet planı
ground-floor.png        # Zemin kat planı
first-floor.png         # 1. kat planı
elevation-front.png     # Ön cephe görünümü
elevation-side.png      # Yan cephe görünümü
section-a-a.png         # A-A kesit
section-b-b.png         # B-B kesit
```

### 5. Sliders - Project Plan Placeholder (`/sliders/project-plans/`)
```
project-plan-overview-01.jpg     # Genel vaziyet placeholder
project-plan-block-layout-01.jpg # Blok yerleşim placeholder
project-plan-vision-01.jpg       # Konsept/vizyon placeholder
project-plan-[theme]-0X.jpg      # Her yeni tema için artan numaralandırma
```
- Dosya adlarında kullanılacak `theme` örnekleri: `health`, `retail`, `mobility`, `night`, `aerial`
- Slider görselleri 16:9 veya 3:2 oranında optimize edilmeli (1920x1080 önerilir)
- Her görselin WebP karşılığı isteğe bağlı olarak `project-plan-overview-01.webp` şeklinde eklenebilir

### 6. Backgrounds (`/backgrounds/`)
```
hero-bg.jpg             # Ana sayfa hero arka plan
location-bg.jpg         # Konum bölümü arka plan
project-bg.jpg          # Proje bölümü arka plan
contact-bg.jpg          # İletişim bölümü arka plan
```

### 7. Logos (`/logos/`)
```
meydan16-logo.png       # Ana logo
meydan16-logo-dark.png  # Koyu tema logo
meydan16-logo-light.png # Açık tema logo
meydan16-icon.png       # İkon versiyonu
brasco-logo.png         # Firma logosu
```

## Example File Organization

```
/public/assets/images/
├── gallery/
│   ├── exterior-01.jpg
│   ├── exterior-02.jpg
│   ├── interior-01.jpg
│   ├── landscape-01.jpg
│   └── night-view-01.jpg
├── blocks/
│   ├── block-a-plan.png
│   ├── block-b-plan.png
│   ├── block-c-plan.png
│   ├── block-d-plan.png
│   ├── block-e-plan.png
│   └── block-f-plan.png
├── renders/
│   ├── render-aerial-01.jpg
│   ├── render-street-01.jpg
│   └── render-plaza-01.jpg
├── sliders/
│   └── project-plans/
│       ├── project-plan-overview-01.jpg
│       └── project-plan-vision-01.jpg
├── floor-plans/
│   ├── site-plan.png
│   ├── ground-floor.png
│   └── elevation-front.png
├── backgrounds/
│   ├── hero-bg.jpg
│   ├── location-bg.jpg
│   └── project-bg.jpg
└── logos/
    ├── meydan16-logo.png
    └── meydan16-logo-dark.png
```

## Migration Guide

### Current Files to Rename:
- `meydan16Logo-correct.png` → `logos/meydan16-logo.png`
- `hero-section-bg.jpg` → `backgrounds/hero-bg.jpg`
- `background2.jpg` → `backgrounds/location-bg.jpg`
- `KonumBG.jpg` → `backgrounds/location-bg-alt.jpg`
- `ProjeBG.jpg` → `backgrounds/project-bg.jpg`
- `blok-planları/A-BLOK-KUTU1.png` → `blocks/block-a-plan.png`
- `blok-planları/B-BLOK-KUTU1.png` → `blocks/block-b-plan.png`
- `blok-planları/C-BLOK-KUTU1.png` → `blocks/block-c-plan.png`
- `blok-planları/D-BLOK-KUTU1.png` → `blocks/block-d-plan.png`
- `blok-planları/E-BLOK-KUTU1.png` → `blocks/block-e-plan.png`
- `blok-planları/F-BLOK-KUTU1.png` → `blocks/block-f-plan.png`
- `ProjeBG.jpg` (slider için kullanılırsa) → `sliders/project-plans/project-plan-overview-01.jpg`

## Notes for Implementation

1. **Image Optimization**: Tüm görseller web için optimize edilmeli (maksimum 2MB, ideal 200-500KB)
2. **Responsive Images**: Farklı çözünürlükler için alternatif boyutlar hazırlanabilir (örn: `exterior-01-sm.jpg`, `exterior-01-lg.jpg`)
3. **Alt Text**: HTML'de kullanılan tüm görseller için anlamlı alt text eklenmelidir
4. **Lazy Loading**: Performans için görsellerde lazy loading kullanılmalıdır
5. **WebP Format**: Modern tarayıcılar için WebP formatında alternatifler sağlanabilir
