"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AirplaneDownCanvas = dynamic(() => import("./AirplaneDown"), { ssr: false });

const STEPS = [
  {
    number: "01",
    title: "Crie sua conta grátis",
    description:
      "Leva menos de 2 minutos. Basta e-mail e senha — sem cartão de crédito necessário.",
  },
  {
    number: "02",
    title: "Escolha seu destino",
    description:
      "Explore mais de 50 rotas nacionais e internacionais com filtros por data, preço e escalas.",
  },
  {
    number: "03",
    title: "Acumule milhas",
    description:
      "Cada voo reservado gera pontos automáticos. Troque por upgrades, bagagens ou novos voos.",
  },
  {
    number: "04",
    title: "Voe com economia",
    description:
      "Membros economizam em média 23% em relação ao preço público. Quanto mais voa, mais benefícios.",
  },
];

export default function HowItWorks() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative w-full"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Borda superior */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-default)" }}
      />

      <div className="flex">

        {/* ── Esquerda: steps (55%) — scrollável normalmente ──── */}
        <div
          className="flex flex-col justify-center px-10 lg:px-20 py-20 gap-16"
          style={{ width: "55%" }}
        >
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-lg">
            

            <h2
              className="text-5xl sm:text-6xl font-light leading-[1.1] tracking-tight"
              style={{ color: "var(--azul-navy)" }}
            >
              Simples assim,{" "}
              <em className="not-italic font-semibold">voar</em>
              <br />
              custa menos.
            </h2>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Do cadastro ao embarque em quatro passos. Economize desde a primeira reserva.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-10 max-w-md">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="flex gap-6 items-start"
              >
                {/* Número + linha vertical */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: "var(--azul-blue)" }}
                  >
                    {step.number}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px"
                      style={{
                        height: 56,
                        background:
                          "linear-gradient(to bottom, var(--border-hover), transparent)",
                      }}
                    />
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col gap-1 pb-2">
                  <p
                    className="text-base font-semibold tracking-tight"
                    style={{ color: "var(--azul-navy)" }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA */}
            <button
              className="text-sm font-medium px-6 py-3 rounded-full w-fit transition-opacity hover:opacity-80 text-white mt-2"
              style={{ background: "var(--azul-navy)" }}
            >
              Criar conta grátis
            </button>
          </div>
        </div>

        {/* ── Direita: canvas avião (45%) — sticky independente ── */}
        <div
          className="overflow-hidden sticky top-0 h-screen self-start"
          style={{
            width: "45%",
            background: "var(--bg-card)",
            borderLeft: "1px solid var(--border-default)",
          }}
        >
          {/* Linha tracejada central */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none"
            style={{
              width: 1,
              background:
                "repeating-linear-gradient(to bottom, var(--border-hover) 0px, var(--border-hover) 8px, transparent 8px, transparent 18px)",
            }}
          />

          {/* Canvas 3D — ocupa 100% do painel */}
          <AirplaneDownCanvas />
        </div>

      </div>
    </section>
  );
}