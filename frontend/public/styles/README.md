# MEYDAN16 Stil Rehberi

Bu klasör, yeniden düzenlenen tasarım sistemine ait tüm stil dosyalarını barındırır.

## Dosyalar

- **style.css** – Renk/typografi belirteçleri, global layout (header, hero, geçiş bölümü) ve gezinme sistemleri.
- **sections.css** – Konum, proje, planlar, portföy, müsaitlik, galeri ve iletişim bölümlerine ait bileşenler.
- **pages.css** – Basit istifleme yardımcıları (örn. `.section-stack`, `.badge`) ve metin yardımcıları.

## Tasarım İlkeleri

- Renk yönetimi tamamen CSS değişkenleri (design tokens) üzerinden ilerler.
- Tüm geçişler ortak `duration` ve `easing` değişkenlerini kullanır; keyfi süreler kullanılmaz.
- Koyu tema yüzeyleri `surface`, `surface-muted`, `surface-elevated` bileşenleriyle katmanlanır.
- Kartlar ve modüller `var(--shadow-soft)` ve `var(--shadow-pop)` gölge sistemini paylaşır.

## Duyarlılık Kırılımları

- 1024px: Izgara düzenleri tek sütuna geçer.
- 768px: Bölüm aralıkları küçülür, tipografi ölçeklenir.
- 540px: Filtre ve butonlar tam genişliğe alınır.

## Performans Notları

- Animasyonlar `transform` ve `opacity` üzerinde çalışarak GPU hızlandırmasından faydalanır.
- `will-change` sadece gerektiği yerlerde kullanılır, gereksiz maliyetlere izin verilmez.
- Form odak durumları erişilebilirlik için kontrastlı gölgelere sahiptir.
