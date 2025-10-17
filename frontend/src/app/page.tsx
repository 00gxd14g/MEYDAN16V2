"use client";
import Image from "next/image";
import { DemoOne as DemoSlider } from "@/components/ui/image-auto-slider-demo";
import DarkGrid from "@/components/ui/dark-grid";
import { Konum } from "@/components/sections/Konum";

export default function Home() {
  return (
    <main className="main-content">
      {/* Hero */}
      <section id="hero" className="section hero-section section-visible" aria-label="Tanıtım">
        <div className="container hero-container">
          <div className="hero-brand">
            <Image src="/assets/images/meydan16Logo-correct.png" alt="MEYDAN16 Logo" className="hero-logo" width={512} height={512} priority />
          </div>
          <div className="hero-copy">
            <h1 className="hero-heading">
              <span>Şehrin</span>
              <span>Yeni</span>
              <span>Meydanı</span>
            </h1>
            <p className="hero-description"></p>
          </div>
        </div>
        <button className="scroll-indicator" aria-label="Aşağı kaydır">
          <span className="scroll-arrow"></span>
          <span className="scroll-text">Keşfet</span>
        </button>
      </section>

      <Konum />

      {/* Transition: konum -> proje */}
      <section id="transition-konum-proje" className="transition-section transition--dark" aria-label="Geçiş">
        <div className="container transition-content">
          <p className="transition-slogan">Şehrin Yeni Meydanı Acemler&#39;de Yükseliyor...</p>
        </div>
      </section>

      {/* Proje (structure preserved) */}
      <section id="proje" className="section project-section section-visible" aria-label="Proje Detayları">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Proje</h2>
          </header>
          <div className="project-content">
            <div className="project-panel">
              <div className="project-copy">
                <span className="project-pill">Brasco Group Yapı A.Ş.</span>
                <div className="project-text">
                  <p>Yurtiçi ve yurtdışı yatırımcıların ortak enerjisi ile Türkiye’nin kalbi Bursa’da Brasco Group Yapı A.Ş.’den Bursa’ya yeni meydan.</p>
                  <p>MEYDAN16, açık hava meydanı temasıyla ticari markaları sağlık, perakende ve gastronomi fonksiyonlarıyla buluşturur. 4,5 metre kat yüksekliği ve geniş cam cepheleriyle ferah deneyim sunar.</p>
                  <p>Enerji verimliliği gözetilerek geliştirilen proje, çatı GES sistemi ve sürdürülebilir altyapısıyla yatırımcıları için düşük işletme maliyeti hedefler.</p>
                </div>
              </div>
              <div className="project-metrics">
                <DarkGrid />
              </div>
            </div>
            {/* DarkGrid metrics moved into project-metrics block above */}
          </div>
        </div>
      </section>

      {/* Transition: proje -> planlar */}
      <section id="transition-proje-planlar" className="transition-section transition--accent" aria-label="Geçiş">
        <div className="container transition-content"><p className="transition-slogan">Eşsiz mimarisi ile Meydan16’daki yeriniz hazır</p></div>
      </section>

      {/* Planlar (static grid) */}
      <section id="planlar" className="section planlar-section section-visible" aria-label="Planlar ve Bloklar">
        <div className="container">
          <header className="section-header"><h2 className="section-title">Planlar &amp; Bloklar</h2></header>
          <div className="blocks-filter">
            <button className="filter-btn active" data-filter="all">Tümü</button>
            <button className="filter-btn" data-filter="a-blok">A Blok</button>
            <button className="filter-btn" data-filter="b-blok">B Blok</button>
            <button className="filter-btn" data-filter="c-blok">C Blok</button>
            <button className="filter-btn" data-filter="d-blok">D Blok</button>
            <button className="filter-btn" data-filter="ef-blok">E &amp; F Blok</button>
          </div>
          <div className="blocks-grid">
            {[
              {cat:"a-blok",block:"a",img:"/assets/images/blok-planları/A-BLOK-KUTU1.png",label:"A BLOK",title:"Ticari Merkez",desc:"484 m² net alan.",spec1:"4 Dükkan",spec2:"Brüt 852 m²"},
              {cat:"b-blok",block:"b",img:"/assets/images/blok-planları/B-BLOK-KUTU1.png",label:"B BLOK",title:"Karma İşletme",desc:"(5 Dükkan)",spec1:"Net 620 m²",spec2:""},
              {cat:"c-blok",block:"c",img:"/assets/images/blok-planları/C-BLOK-KUTU1.png",label:"C BLOK",title:"Sağlık & Hizmet",desc:"(4 Dükkan)",spec1:"Net 406 m²",spec2:""},
              {cat:"d-blok",block:"d",img:"/assets/images/blok-planları/D-BLOK-KUTU1.png",label:"D BLOK",title:"Yiyecek & İçecek",desc:"918 m² net alan.",spec1:"7 Dükkan",spec2:"Brüt 1.451 m²"},
              {cat:"ef-blok",block:"e",img:"/assets/images/blok-planları/E-BLOK-KUTU1.png",label:"E BLOK",title:"Sağlık Merkezi",desc:"1.424 m² net alan.",spec1:"7 Dükkan",spec2:""},
              {cat:"ef-blok",block:"f",img:"/assets/images/blok-planları/F-BLOK-KUTU1.png",label:"F BLOK",title:"Sosyal Hizmetler",desc:"Karşılıklı 9 butik dükkan.",spec1:"Brüt 1.634 m²",spec2:""},
            ].map(b => (
              <article key={b.title} className="block-item" data-category={b.cat} data-block={b.block}>
                <div className="block-image-container relative">
                  <Image src={b.img} alt={b.label} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" style={{ objectFit: 'contain' }} />
                  <div className="block-image-overlay"><span className="block-overlay-name">{b.label}</span></div>
                </div>
                <div className="block-content">
                  <span className="block-label">{b.label}</span>
                  <h3 className="block-title">{b.title}</h3>
                  <p className="block-description">{b.desc}</p>
                  <div className="block-specs"><span className="spec-item">{b.spec1}</span><span className="spec-item">{b.spec2}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Transition: planlar -> galeri */}
      <section id="transition-planlar-galeri" className="transition-section transition--soft" aria-label="Geçiş">
        <div className="container transition-content"><p className="transition-slogan">Proje’nin eşsiz mimari ruhunu görsellerle keşfedin</p></div>
      </section>

      {/* Block Modal (for block details) */}
      <div className="block-modal" id="blockModal">
        <div className="block-modal-overlay"></div>
        <div className="block-modal-content">
          <button className="block-modal-close" aria-label="Kapat">×</button>
          <div className="block-modal-body">
            <div className="block-modal-header">
              <span className="block-modal-label" id="modalBlockLabel"></span>
              <h3 className="block-modal-title" id="modalBlockTitle"></h3>
            </div>
            <div className="block-modal-details">
              <div className="block-modal-image">
                <img id="modalBlockImage" alt="" />
              </div>
              <div className="block-modal-info">
                <p className="block-modal-description" id="modalBlockDescription"></p>
                <div className="block-modal-specs" id="modalBlockSpecs"></div>
                <div className="block-modal-features" id="modalBlockFeatures"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galeri */}
      <section id="galeri" className="section gallery-section section-visible" aria-label="Galeri">
        <div className="container">
          <header className="section-header"><h2 className="section-title">Galeri</h2><p className="section-subtitle">Proje görsellerinden seçkiler</p></header>
          <DemoSlider />
        </div>
      </section>

      {/* Transition: galeri -> iletisim */}
      <section id="transition-galeri-iletisim" className="transition-section transition--accent" aria-label="Geçiş">
        <div className="container transition-content"><p className="transition-slogan">Sizin için doğru alanı birlikte planlayalım</p></div>
      </section>

      {/* İletişim (simplified form structure to keep classes) */}
      <section id="iletisim" className="section contact-section section-visible" aria-label="İletişim ve Başvuru">
        <div className="container">
          <header className="section-header"><h2 className="section-title">İletişim</h2><p className="section-subtitle">Başvuru Formu</p></header>
          <div className="contact-grid">
            <div className="contact-details">
              <h3>BRASCO GRUP YAPI A.Ş.</h3>
              <div className="contact-item"><h4>Adres</h4><p>Dikkaldırım Mahallesi<br/>Yeni Stadyum Caddesi No:16 T<br/>Osmangazi / Bursa</p></div>
              <div className="contact-item"><h4>E-posta</h4><p><a href="mailto:info@meydan16.com.tr">info@meydan16.com.tr</a></p></div>
              <div className="contact-item"><h4>Harita</h4>
                <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2007.5948074165299!2d29.012573710193927!3d40.21232789544001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sacemler!5e0!3m2!1str!2str!4v1760551155607!5m2!1str!2str"
                    style={{ width: '100%', height: 320, border: 0 as any }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form" id="contactForm" noValidate>
                <div className="form-row"><div className="form-group"><label htmlFor="name">Ad Soyad *</label><input id="name" name="name" required /></div><div className="form-group"><label htmlFor="phone">Telefon *</label><input id="phone" name="phone" required /></div></div>
                <div className="form-row"><div className="form-group"><label htmlFor="email">E-posta *</label><input id="email" name="email" required /></div><div className="form-group"><label htmlFor="company">Firma Adı</label><input id="company" name="company" /></div></div>
                <div className="form-row"><div className="form-group"><label htmlFor="mainCategory">Ana Kategori *</label><select id="mainCategory" name="mainCategory" required><option value="">Seçiniz</option><option value="saglik">Sağlık</option><option value="perakende">Perakende</option></select></div><div className="form-group"><label htmlFor="subCategory">Alt Kategori *</label><select id="subCategory" name="subCategory" required disabled><option value="">Önce ana kategori seçin</option></select></div></div>
                <div className="form-row"><div className="form-group"><label htmlFor="corporate">Kurumsal marka mısınız? *</label><select id="corporate" name="corporate" required><option value="">Seçiniz</option><option value="evet">Evet</option><option value="hayir">Hayır</option></select></div><div className="form-group"><label htmlFor="businessType">İşletme Türü *</label><select id="businessType" name="businessType" required><option value="">Seçiniz</option><option value="franchise">Franchise</option><option value="sahip">İşletme Sahibi</option></select></div></div>
                <div className="form-row full"><div className="form-group"><label htmlFor="message">Mesajınız *</label><textarea id="message" name="message" rows={5} required></textarea></div></div>
                <div className="form-feedback" id="contactFeedback" role="status" aria-live="polite"></div>
                <button type="submit" className="submit-button">Gönder</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
