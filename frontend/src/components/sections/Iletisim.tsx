"use client";
import { useState } from "react";

export function Iletisim() {
  const [sent, setSent] = useState<"idle" | "ok" | "error">("idle");
  return (
    <section id="iletisim" className="py-12">
      <div className="container mx-auto px-6">
        <header className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl uppercase tracking-widest">İletişim / Başvuru</h2>
        </header>
        <form
          className="grid md:grid-cols-2 gap-4 bg-raisin-black/10 rounded-xl p-6 border border-raisin-black/20"
          onSubmit={(e) => {
            e.preventDefault();
            setTimeout(() => setSent("ok"), 800);
          }}
        >
          <input className="bg-ghost-white/10 rounded-md p-3 outline-none" placeholder="Ad Soyad *" required />
          <input className="bg-ghost-white/10 rounded-md p-3 outline-none" placeholder="Telefon *" required />
          <input className="bg-ghost-white/10 rounded-md p-3 outline-none" placeholder="E-posta *" type="email" required />
          <input className="bg-ghost-white/10 rounded-md p-3 outline-none" placeholder="Firma" />
          <select className="bg-ghost-white/10 rounded-md p-3 outline-none" required>
            <option value="">Ana Kategori *</option>
            <option value="saglik">Sağlık</option>
            <option value="perakende">Perakende</option>
          </select>
          <select className="bg-ghost-white/10 rounded-md p-3 outline-none" required>
            <option value="">Alt Kategori *</option>
            <option value="eczane">Eczane</option>
            <option value="medikal">Medikal</option>
          </select>
          <select className="bg-ghost-white/10 rounded-md p-3 outline-none" required>
            <option value="">Kurumsal marka mısınız? *</option>
            <option value="evet">Evet</option>
            <option value="hayir">Hayır</option>
          </select>
          <select className="bg-ghost-white/10 rounded-md p-3 outline-none" required>
            <option value="">İşletme Türü *</option>
            <option value="franchise">Franchise</option>
            <option value="sahip">İşletme Sahibi</option>
          </select>
          <textarea className="bg-ghost-white/10 rounded-md p-3 outline-none md:col-span-2" placeholder="Mesajınız *" rows={5} required />
          <div className="md:col-span-2 flex items-center gap-3">
            <button type="submit" className="px-4 py-2 rounded-md bg-[#9edd84] text-black font-semibold">Gönder</button>
            {sent === "ok" && <span className="text-[#9edd84]">Teşekkürler, en kısa sürede iletişime geçeceğiz.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

