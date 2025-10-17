import Image from "next/image";
type Block = { key: string; name: string; title: string; img: string; desc: string };

const blocks: Block[] = [
  { key: "a", name: "A BLOK", title: "Ticari Merkez", img: "/assets/images/blok-planları/A-BLOK-KUTU1.png", desc: "Zincir market, teknoloji ve paylaşımlı ofis fonksiyonları için 484 m² net alan." },
  { key: "b", name: "B BLOK", title: "Karma İşletme", img: "/assets/images/blok-planları/B-BLOK-KUTU1.png", desc: "Esnek kullanım alanı, modüler planlama." },
  { key: "c", name: "C BLOK", title: "Sağlık & Hizmet", img: "/assets/images/blok-planları/C-BLOK-KUTU1.png", desc: "Poliklinik, medikal ve destek hizmetleri için." },
  { key: "d", name: "D BLOK", title: "Yiyecek & İçecek", img: "/assets/images/blok-planları/D-BLOK-KUTU1.png", desc: "Gastronomi merkezi ve restoranlar." },
  { key: "e", name: "E BLOK", title: "Sağlık Merkezi", img: "/assets/images/blok-planları/E-BLOK-KUTU1.png", desc: "Eczane, optik, medikal ve kişisel bakım." },
  { key: "f", name: "F BLOK", title: "Sosyal Hizmetler", img: "/assets/images/blok-planları/F-BLOK-KUTU1.png", desc: "Destek fonksiyonlar için butik dükkanlar." },
];

export function Planlar() {
  return (
    <section id="planlar" className="py-12">
      <div className="container mx-auto px-6">
        <header className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl uppercase tracking-widest">Planlar & Bloklar</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <article key={b.key} className="rounded-xl overflow-hidden bg-raisin-black/10 border border-raisin-black/20">
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image src={b.img} alt={b.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" style={{ objectFit: 'contain' }} className="bg-eerie-black/20" />
              </div>
              <div className="p-4">
                <span className="text-xs uppercase text-white/60">{b.name}</span>
                <h3 className="text-xl mt-1">{b.title}</h3>
                <p className="text-white/70 text-sm mt-2">{b.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
