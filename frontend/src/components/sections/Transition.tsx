type Theme = "accent" | "dark" | "soft";

export function Transition({ text, theme = "accent" }: { text: string; theme?: Theme }) {
  const themeClass =
    theme === "accent"
      ? "shadow-[0_24px_60px_rgba(158,221,132,0.35)]" // Keep green accent
      : theme === "dark"
      ? "shadow-[0_24px_60px_rgba(24,24,24,0.7)]" // eerie-black
      : "shadow-[0_24px_60px_rgba(192,50,33,0.22)]"; // engineering-orange soft
  return (
    <section className={`py-10 ${themeClass}`}>
      <div className="container mx-auto px-6 text-center">
        <p className="uppercase tracking-widest text-lg md:text-2xl text-[#e9f6e5]">
          {text}
        </p>
      </div>
    </section>
  );
}

