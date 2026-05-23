"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  {
    n: "1",
    label: "Destinos",
    heading: ["Experimente", "a Magia do", "Voo!"],
    cta: "Explorar Destinos",
    card: { title: "Destinos Incríveis", sub: "Descubra o mundo, uma aventura de cada vez." },
  },
  {
    n: "2",
    label: "Ofertas",
    heading: ["Passagens com", "Preços que", "Surpreendem!"],
    cta: "Ver Ofertas",
    card: { title: "Economize Agora", sub: "Descontos de até 40% em rotas selecionadas." },
  },
  {
    n: "3",
    label: "Pacotes",
    heading: ["Pacotes", "Completos para", "Viajar Mais!"],
    cta: "Ver Pacotes",
    card: { title: "Tudo Incluído", sub: "Voo + hotel + transfers em um só lugar." },
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  useEffect(() => {
    const id = setInterval(() => {
      setActive((c) => (c + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex flex-col px-10"
      style={{
        backgroundImage: "url('/assets/bg-hero-pouso.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* overlay suave para legibilidade do texto */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(255,255,255,0.55) 40%, transparent 100%)", zIndex: 0 }}
      />

      {/* Navbar */}
      <nav
        className="relative flex items-center justify-between px-8 lg:px-14 py-5"
        style={{ zIndex: 10 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "var(--azul-blue)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M3 12h18M12 3c-3 3-4.5 6-4.5 9s1.5 6 4.5 9M12 3c3 3 4.5 6 4.5 9s-1.5 6-4.5 9"
                stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-base font-semibold tracking-tight" style={{ color: "#111" }}>
            Voa<span style={{ color: "var(--azul-blue)" }}>Lá</span>.
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {["Pacotes", "Contato", "Início", "Tour", "Sobre"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "#111" }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          className="text-sm font-semibold px-6 py-2.5 rounded-full transition-opacity hover:opacity-80 cursor-pointer"
          style={{ background: "#111", color: "#fff" }}
        >
          Reservar Viagem
        </button>
      </nav>

      {/* Main content */}
      <div className="relative flex flex-1" style={{ zIndex: 5 }}>

        {/* Slide steps — coluna esquerda fina */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-4 pl-8 pr-4 py-10">
          {SLIDES.map((s, i) => (
            <button
              key={s.n}
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all"
                style={{
                  background: active === i ? "var(--azul-blue)" : "rgba(255,255,255,0.75)",
                  color: active === i ? "#fff" : "#555",
                  boxShadow: active === i ? "0 4px 14px rgba(45,123,196,0.35)" : "none",
                  border: active === i ? "none" : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {s.n}
              </div>
              {i < SLIDES.length - 1 && (
                <div className="w-px h-8" style={{ background: "rgba(0,0,0,0.12)" }} />
              )}
            </button>
          ))}
        </div>

        {/* Left: texto */}
        <div className="flex flex-col justify-center gap-8 px-6 lg:px-10 py-10 lg:w-[42%]">
          

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight"
            style={{ color: "#0a0a0a" }}
          >
            {slide.heading[0]}
            <br />
            {slide.heading[1]}
            <br />
            <span style={{ color: "var(--azul-blue)" }}>{slide.heading[2]}</span>
          </h1>

          {/* CTA row */}
          <div className="flex items-center gap-4 mt-2">
            <button
              className="text-sm font-semibold px-7 py-3.5 rounded-full transition-opacity hover:opacity-80 cursor-pointer"
              style={{ background: "var(--azul-blue)", color: "#fff" }}
            >
              {slide.cta}
            </button>

            {/* Play button */}
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2L12 7L3 12V2Z" fill="var(--azul-blue)" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: card "Know More" */}
        <div className="hidden lg:flex flex-1 items-end justify-end pb-16 pr-10">
          <div
            className="rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              minWidth: 260,
            }}
          >
           

            <div className="flex flex-col gap-0.5 flex-1">
              <p className="text-sm font-semibold" style={{ color: "#111" }}>
                {slide.card.title}
              </p>
              <p className="text-xs leading-snug" style={{ color: "#666" }}>
                {slide.card.sub}
              </p>
            </div>

            <button
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 cursor-pointer"
              style={{ background: "#111" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
