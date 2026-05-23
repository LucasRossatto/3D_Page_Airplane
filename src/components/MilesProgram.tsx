"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    id: "prata",
    name: "Prata",
    range: "0 – 9.999 milhas",
    color: "#8A9BB0",
    bg: "#F4F6FA",
    border: "#DCE2E8",
    icon: "✦",
    perks: [
      "1 milha por R$ 1 gasto",
      "Check-in prioritário",
      "Acesso a tarifas exclusivas",
      "Suporte por chat 8h–22h",
    ],
  },
  {
    id: "ouro",
    name: "Ouro",
    range: "10.000 – 49.999 milhas",
    color: "#C9860A",
    bg: "#FFFBF0",
    border: "#FFE0A0",
    icon: "◆",
    featured: true,
    perks: [
      "1,5 milha por R$ 1 gasto",
      "1 bagagem extra incluída",
      "Upgrade grátis (sujeito à disp.)",
      "Suporte prioritário 24/7",
      "Acesso a salas VIP em 12 aeroportos",
    ],
  },
  {
    id: "diamante",
    name: "Diamante",
    range: "50.000+ milhas",
    color: "#2D7BC4",
    bg: "#EAF3FC",
    border: "#A8D0F0",
    icon: "❋",
    perks: [
      "2 milhas por R$ 1 gasto",
      "2 bagagens extras incluídas",
      "Upgrade garantido sempre que disponível",
      "Personal travel advisor dedicado",
      "Acesso ilimitado a salas VIP globais",
      "Transferência de milhas para parceiros",
    ],
  },
];

const STATS = [
  { value: "127k", label: "membros ativos" },
  { value: "R$820", label: "economia média/reserva" },
  { value: "4.8★", label: "avaliação no app" },
  { value: "50+", label: "destinos exclusivos" },
];

export default function MilesProgram() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState("ouro");

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      };
      gsap.from(headRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
      gsap.from(statsRef.current!.children, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.2,
        scrollTrigger: trigger,
      });
      gsap.from(tiersRef.current!.children, {
        opacity: 0,
        y: 48,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.35,
        scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-6 lg:px-16"
      style={{ background: "var(--azul-navy)" }}
    >
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #FFC801 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #2D7BC4 0%, transparent 40%)`,
        }}
      />

      {/* Header */}
      <div ref={headRef} className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "var(--azul-yellow)" }}
          >
            VoaLá Miles
          </span>
          <div
            className="h-px w-10"
            style={{ background: "rgba(255,200,1,0.4)" }}
          />
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.06] tracking-tight text-white mb-5">
          Voe mais. Pague{" "}
          <em
            className="not-italic font-semibold"
            style={{ color: "var(--azul-yellow)" }}
          >
            cada vez menos.
          </em>
        </h2>
        <p
          className="text-base leading-relaxed max-w-lg"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Cada reserva gera milhas que nunca expiram. Troque por upgrade, bagagem extra
          ou desconto real na próxima passagem. Quanto mais você voa, mais vale.
        </p>
      </div>

      {/* Stats row */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col gap-1 rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="text-2xl font-black text-white"
              style={{
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </p>
            <p
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Tier cards */}
      <div ref={tiersRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier) => {
          const isActive = activeTier === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setActiveTier(tier.id)}
              className="text-left flex flex-col gap-5 p-6 rounded-3xl relative overflow-hidden"
              style={{
                background: tier.bg,
                border: `2px solid ${isActive ? tier.color : tier.border}`,
                boxShadow: isActive
                  ? `0 0 0 4px ${tier.color}20, 0 16px 48px rgba(0,0,0,0.2)`
                  : "none",
                transition:
                  "border-color 250ms, box-shadow 250ms, transform 250ms",
                transform:
                  isActive && tier.featured ? "scale(1.02)" : "scale(1)",
              }}
            >
              {tier.featured && (
                <div
                  className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                  style={{ background: tier.color, color: "#fff" }}
                >
                  Mais popular
                </div>
              )}

              {/* Icon + name */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black"
                  style={{ background: `${tier.color}20`, color: tier.color }}
                >
                  {tier.icon}
                </div>
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: `${tier.color}99` }}
                  >
                    Nível
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{ color: "#0B2E5E" }}
                  >
                    {tier.name}
                  </p>
                </div>
              </div>

              {/* Miles range */}
              <div
                className="text-[11px] font-semibold px-3 py-1.5 rounded-full w-fit"
                style={{ background: `${tier.color}15`, color: tier.color }}
              >
                {tier.range}
              </div>

              {/* Perks */}
              <ul className="flex flex-col gap-2.5">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <circle cx="7" cy="7" r="7" fill={`${tier.color}20`} />
                      <path
                        d="M4.5 7l2 2 3-3"
                        stroke={tier.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-[13px] leading-snug"
                      style={{ color: "#3D4F63" }}
                    >
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 pt-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Suas milhas nunca expiram. Sem prazo, sem pressão.
        </p>
        <button
          type="button"
          className="text-sm font-bold px-7 py-3.5 rounded-full"
          style={{
            background: "var(--azul-yellow)",
            color: "var(--azul-navy)",
            boxShadow: "0 6px 24px rgba(255,200,1,0.35)",
            transition: "opacity 150ms, transform 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Criar conta e começar a ganhar milhas
        </button>
      </div>
    </section>
  );
}
