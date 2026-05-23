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
    title: "Cadastro em 2 minutos",
    description:
      "Só e-mail e senha. Sem cartão de crédito — você já pesquisa voos na hora.",
  },
  {
    number: "02",
    title: "Escolha o voo certo",
    description:
      "Filtre por data, preço, escalas e classe. 50+ rotas com tarifas atualizadas todo dia.",
  },
  {
    number: "03",
    title: "Reserve e ganhe milhas",
    description:
      "Cada compra gera milhas automáticas. Troque por upgrade, bagagem extra ou desconto real no próximo voo.",
  },
  {
    number: "04",
    title: "Pague menos sempre",
    description:
      "Membros pagam 23% a menos que o preço público. O desconto cresce conforme você voa.",
  },
];

export default function HowItWorks() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

      <div className="flex flex-col lg:flex-row">

        {/* ── Esquerda: steps — scrollável normalmente ──── */}
        <div
          className="flex flex-col justify-center px-10 lg:px-20 py-20 gap-16 w-full lg:w-[55%]"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-lg">
            

            <h2
              className="text-5xl sm:text-6xl font-light leading-[1.1] tracking-tight"
              style={{ color: "var(--azul-navy)" }}
            >
              Do cadastro ao{" "}
              <em className="not-italic font-semibold">embarque em minutos.</em>
            </h2>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Sem ligações. Sem fila. Sem surpresa na fatura.
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
                    style={{ color: "var(--azul-yellow)" }}
                  >
                    {step.number}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px"
                      style={{
                        height: 56,
                        background:
                          "linear-gradient(to bottom, var(--azul-yellow), transparent)",
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
              type="button"
              className="text-sm font-medium px-6 py-3 rounded-full w-fit text-white mt-2"
              style={{ background: "var(--azul-yellow)", color: "var(--azul-navy)", transition: "opacity 200ms" }}
            >
              Criar conta — é grátis
            </button>
          </div>
        </div>

        {/* ── Direita: canvas avião — sticky independente ── */}
        <div
          className="hidden lg:block overflow-hidden sticky top-0 h-screen self-start w-full lg:w-[45%]"
          style={{
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