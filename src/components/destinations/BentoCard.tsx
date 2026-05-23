"use client";

import React from "react";
import { Destination, PKG_LABEL, REGION_ACCENT } from "./destinationsData";

const SLOT_STYLE: { col: string; row: string; variant: "banner" | "tall" | "wide" }[] = [
  { col: "1 / span 5",  row: "1", variant: "banner" },
  { col: "6 / span 3",  row: "1", variant: "tall"   },
  { col: "9 / span 4",  row: "1", variant: "tall"   },
  { col: "1 / span 3",  row: "2", variant: "tall"   },
  { col: "4 / span 3",  row: "2", variant: "tall"   },
  { col: "7 / span 6",  row: "2", variant: "banner" },
];

interface BentoCardProps {
  dest: Destination;
  slot: number;
  onOpen: (d: Destination) => void;
}

export default function BentoCard({ dest, slot, onOpen }: BentoCardProps) {
  const { col, row, variant } = SLOT_STYLE[slot] ?? SLOT_STYLE[0];
  const isBanner = variant === "banner";
  const accent = REGION_ACCENT[dest.region];
  const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <button
      type="button"
      onClick={() => onOpen(dest)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(dest); } }}
      aria-label={`Ver detalhes de ${dest.city}, ${dest.country}`}
      className="dest-card group relative overflow-hidden rounded-3xl cursor-pointer bento-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{
        ["--col" as string]: col,
        ["--row" as string]: row,
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      } as React.CSSProperties}
    >
      {/* Foto de fundo com zoom no hover */}
      <div
        className="card-img absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${dest.image})`,
          transition: "transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Gradientes atmosféricos */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.55) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 35%)" }} />

      {/* Painel hover deslizante (banners) */}
      {isBanner && dest.description && (
        <div
          className="card-panel-reveal absolute inset-y-0 right-0 w-56 flex flex-col justify-end p-6 z-20"
          style={{
            background: "linear-gradient(to left, rgba(0,0,0,0.82) 0%, transparent 100%)",
            backdropFilter: "blur(2px)",
            transition: "opacity 400ms, transform 400ms",
            opacity: 0,
            transform: "translateX(12px)",
          }}
        >
          <p className="text-xs leading-relaxed text-white/80 mb-3">{dest.description}</p>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/60 uppercase tracking-wider">
            <span>Explorar</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* Topo: país + tag + duração */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-4 pt-4 z-10">
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-bold uppercase text-white/50" style={{ letterSpacing: "0.22em" }}>
            {dest.country}
          </span>
          {dest.tag && (
            <span
              className="inline-flex w-fit text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: "var(--azul-yellow)", color: "var(--azul-navy)" }}
            >
              {dest.tag}
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-1.5 text-[10px] font-medium text-white/70 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 2.5v2.8l1.8 1.1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{dest.duration}</span>
        </div>
      </div>

      {/* Base: cidade + preço + CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 z-10">
        <h3
          className="font-black text-white leading-[0.92] tracking-tight mb-2"
          style={{
            fontSize: isBanner ? "clamp(2rem, 4vw, 3rem)" : "clamp(1.4rem, 2.5vw, 1.75rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          {dest.city}
        </h3>

        <div className="mb-3" style={{ height: 1, background: `linear-gradient(to right, ${accent}99, transparent)` }} />

        <div className={`flex ${isBanner ? "flex-row items-end justify-between" : "flex-col gap-2"}`}>
          <div className="flex flex-wrap gap-1">
            {dest.packages.filter(p => p !== "all").map((p) => (
              <span
                key={p}
                className="text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider"
                style={{
                  background: `${accent}25`,
                  color: accent === "#E6A800" ? "#FFD97D" : accent,
                  border: `1px solid ${accent}40`,
                }}
              >
                {PKG_LABEL[p]}
              </span>
            ))}
          </div>

          <div className={`flex items-center gap-3 ${isBanner ? "" : "justify-between"} shrink-0`}>
            <div className={isBanner ? "text-right" : ""}>
              <p className="text-[8px] uppercase tracking-[0.15em] text-white/40 font-medium">a partir de</p>
              <p
                className="font-bold text-white leading-tight"
                style={{ fontSize: isBanner ? "1.25rem" : "1.1rem", fontVariantNumeric: "tabular-nums" }}
              >
                {fmt.format(dest.price)}
              </p>
            </div>

            <div
              className="card-cta-arrow shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: accent,
                boxShadow: `0 4px 16px ${accent}60`,
                transition: "transform 250ms, box-shadow 250ms",
                ["--accent-shadow" as string]: `${accent}60`,
              } as React.CSSProperties}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
