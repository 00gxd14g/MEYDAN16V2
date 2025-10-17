import Image from "next/image";
export function Hero() {
  return (
    <section id="hero" className="py-16">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        <div className="flex justify-center">
          {/* Static logo from public assets if available */}
          <Image
            src="/assets/images/meydan16Logo-correct.png"
            alt="MEYDAN16 Logo"
            width={512}
            height={512}
            className="w-[240px] drop-shadow-2xl h-auto"
            priority
          />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-7xl tracking-widest uppercase font-light leading-tight">
            Şehrin<br />Yeni<br />Meydanı
          </h1>
          <p className="text-white/70 max-w-xl"></p>
        </div>
      </div>
    </section>
  );
}
