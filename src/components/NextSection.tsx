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
            className="text-sm font-medium px-6 py-3 rounded-full w-fit text-white"
            style={{ background: "var(--azul-yellow)", color: "var(--azul-navy)", transition: "opacity 200ms" }}
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
            priority
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
}
