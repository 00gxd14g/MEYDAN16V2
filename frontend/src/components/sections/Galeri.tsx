export function Galeri() {
  const items = new Array(6).fill(0);
  return (
    <section id="galeri" className="py-12">
      <div className="container mx-auto px-6">
        <header className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl uppercase tracking-widest">Galeri</h2>
          <p className="text-white/60">Proje görsellerinden seçkiler</p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((_, i) => (
            <div key={i} className="aspect-square bg-[#222] rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

