"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function NextSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const paraRef     = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLButtonElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      const base = { opacity: 0, y: 40 };

      gsap.from(badgeRef.current, {
        ...base,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.from(line1Ref.current, {
        y: "110%",
        duration: 0.9,
        ease: "power4.out",
        delay: 0.1,
        scrollTrigger: trigger,
      });

      gsap.from(line2Ref.current, {
        y: "110%",
        duration: 0.9,
        ease: "power4.out",
        delay: 0.22,
        scrollTrigger: trigger,
      });

      gsap.from(paraRef.current, {
        ...base,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.38,
        scrollTrigger: trigger,
      });

      gsap.from(btnRef.current, {
        ...base,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.50,
        scrollTrigger: trigger,
      });

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLDivElement>(".dest-card");
        gsap.from(cards, {
          opacity: 0,
          x: 50,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
          scrollTrigger: trigger,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="next-section"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col z-10"
      style={{ zIndex: 3, color: "var(--text-primary)" }}
    >
      {/* Borda superior sutil */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-default)" }} />

      <div className="flex flex-1 flex-col lg:flex-row">

        {/* Coluna esquerda */}
        <div className="flex flex-col justify-center px-10 py-20 lg:w-1/2 gap-10" style={{ background: "var(--bg-page)" }}>

          {/* Título */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight" style={{ color: "var(--azul-navy)" }}>
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block">Para onde você</span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block">
                quer <em className="not-italic font-semibold">voar?</em>
              </span>
            </span>
          </h2>

          {/* Parágrafo */}
          <p ref={paraRef} className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--text-muted)" }}>
            Mais de 50 rotas nacionais e internacionais.
            Encontre o voo certo pelo preço certo — sem complicação.
          </p>

          {/* Botão */}
          <button
            ref={btnRef}
            type="button"
            className="text-sm font-medium px-6 py-3 rounded-full w-fit transition-colors text-white"
            style={{ background: "var(--azul-yellow)", color: "var(--azul-navy)" }}
          >
            Explorar Destinos
          </button>

        </div>

        {/* Coluna direita — imagem */}
        <div className="flex items-center justify-center px-10 py-20 lg:w-1/2" style={{ background: "var(--bg-card)" }}>
          <Image
            src="/assets/destination-image.png"
            alt="Destination"
            width={600}
            height={500}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
}



function DestinationCard({
  city,
  country,
  temp,
  height,
  gradient,
  accent,
  emoji,
}: {
  city: string;
  country: string;
  temp: string;
  height: string;
  gradient: string;
  accent: string;
  emoji: string;
}) {
  return (
    <div
      className={`dest-card relative ${height} rounded-3xl overflow-hidden hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-pointer group`}
      style={{ background: gradient }}
    >
      {/* Ruído sutil */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Overlay escuro no hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Emoji decorativo centralizado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-5xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 select-none"
          style={{ filter: "grayscale(0.3)" }}
        >
          {emoji}
        </span>
      </div>

      {/* Temperatura */}
      <div
        className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm"
        style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
      >
        {temp}
      </div>

      {/* Ícone de avião */}
      <div className="absolute top-3 left-3 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 16l-9-9-9 9M3 8l9-7 9 7"
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d="M12 2v20M2 12h20"
            stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4"
          />
        </svg>
      </div>

      {/* Info + CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold tracking-tight text-white leading-tight">{city}</p>
            <p className="text-xs text-white/60">{country}</p>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: accent, border: "none" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke={gradient.includes("f7971e") ? "#1a1a1a" : "white"}
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
