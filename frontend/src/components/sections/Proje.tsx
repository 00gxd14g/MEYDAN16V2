export function Proje() {
  const metrics = [
    { label: "Bağımsız Blok", value: "🏢 6" },
    { label: "Toplam Dükkan", value: "🏪 35" },
    { label: "Metre Tavan", value: "📏 4.5" },
    { label: "m² Kapalı Alan", value: "📍 4.000" },
  ];
  return (
    <section id="proje" className="py-12">
      <div className="container mx-auto px-6">
        <header className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl uppercase tracking-widest">Proje</h2>
          <p className="mt-2 italic text-[#9edd84]">&quot;Şehrin Yeni Meydanı Acemler&#39;de Yükseliyor...&quot;</p>
        </header>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4 text-white/85">
            <p>
              MEYDAN16, açık hava meydanı kurgusuyla ticari markaları sağlık, perakende ve gastronomi fonksiyonlarıyla buluşturur. 4,5 metre kat yüksekliği ve geniş cam cepheleriyle ferah deneyim sunar.
            </p>
            <p>
              Enerji verimliliği gözetilerek geliştirilen proje, çatı GES sistemi ve sürdürülebilir altyapısıyla yatırımcıları için düşük işletme maliyeti hedefler.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-xl bg-raisin-black/30 p-6 text-center shadow-accent">
                <div className="text-3xl mb-2">{m.value}</div>
                <div className="text-white/70">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
