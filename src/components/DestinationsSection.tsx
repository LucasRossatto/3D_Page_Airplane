"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Package = "all" | "economy" | "business" | "first";
type Region  = "europe" | "americas" | "asia" | "africa" | "oceania";

interface Destination {
  city: string;
  country: string;
  region: Region;
  packages: Package[];
  duration: string;
  price: number;
  tag?: string;
  description?: string;
  featured?: boolean;
}

const DESTINATIONS: Destination[] = [
  { city: "Paris",        country: "França",       region: "europe",   packages: ["economy","business","first"], duration: "10h", price: 2800, tag: "Mais Popular", featured: true,  description: "Arte, gastronomia e a Torre Eiffel iluminada." },
  { city: "Tóquio",       country: "Japão",         region: "asia",     packages: ["economy","business","first"], duration: "24h", price: 5200, tag: "Novo",          featured: true,  description: "Tradição milenar e futurismo lado a lado." },
  { city: "Nova York",    country: "EUA",           region: "americas", packages: ["economy","business","first"], duration: "9h",  price: 3400,                       featured: true,  description: "A cidade que nunca dorme." },
  { city: "Dubai",        country: "Emirados",      region: "asia",     packages: ["business","first"],           duration: "14h", price: 6800, tag: "Luxo",                           description: "Luxo no deserto." },
  { city: "Sydney",       country: "Austrália",     region: "oceania",  packages: ["economy","business","first"], duration: "27h", price: 6200,                                        description: "Opera House e Bondi Beach." },
  { city: "Cape Town",    country: "África do Sul", region: "africa",   packages: ["economy","business","first"], duration: "16h", price: 4400, tag: "Novo",                           description: "Table Mountain e vinhedos." },
  { city: "Roma",         country: "Itália",        region: "europe",   packages: ["economy","business"],         duration: "11h", price: 2400,                                        description: "Coliseu e gelato autêntico." },
  { city: "Bangkok",      country: "Tailândia",     region: "asia",     packages: ["economy","business"],         duration: "22h", price: 4100,                                        description: "Templos dourados e street food." },
  { city: "Miami",        country: "EUA",           region: "americas", packages: ["economy","business"],         duration: "8h",  price: 2900,                                        description: "Praias, art déco e vida noturna." },
  { city: "Lisboa",       country: "Portugal",      region: "europe",   packages: ["economy"],                    duration: "9h",  price: 1900,                                        description: "Fados, pastéis e o Tejo." },
  { city: "Buenos Aires", country: "Argentina",     region: "americas", packages: ["economy"],                    duration: "3h",  price: 1100,                                        description: "Tango e parrilla." },
  { city: "Cingapura",    country: "Singapura",     region: "asia",     packages: ["economy","business","first"], duration: "23h", price: 4700,                                        description: "Marina Bay e Gardens by the Bay." },
];

const REGIONS: { key: Region | "all"; label: string }[] = [
  { key: "all",      label: "Todos"    },
  { key: "europe",   label: "Europa"   },
  { key: "americas", label: "Américas" },
  { key: "asia",     label: "Ásia"     },
  { key: "africa",   label: "África"   },
  { key: "oceania",  label: "Oceania"  },
];

const PACKAGES: { key: Package | "all"; label: string }[] = [
  { key: "all",      label: "Todos os Pacotes" },
  { key: "economy",  label: "Economy"          },
  { key: "business", label: "Business"         },
  { key: "first",    label: "Primeira Classe"  },
];

const REGION_BG: Record<Region, string> = {
  europe:   "#E3F0FC",
  americas: "#E6F4E5",
  asia:     "#FFF5CC",
  africa:   "#FEF0E0",
  oceania:  "#E3F0FC",
};

const REGION_ACCENT: Record<Region, string> = {
  europe:   "#2D7BC4",
  americas: "#3BAA35",
  asia:     "#E6A800",
  africa:   "#D4760A",
  oceania:  "#0B2E5E",
};

const PKG_LABEL: Record<Package, string> = {
  all: "", economy: "Economy", business: "Business", first: "1ª Classe",
};

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const [region, setRegion] = useState<Region | "all">("all");
  const [pkg,    setPkg]    = useState<Package | "all">("all");

  const filtered = DESTINATIONS.filter((d) => {
    const matchRegion  = region === "all" || d.region === region;
    const matchPackage = pkg    === "all" || d.packages.includes(pkg as Package);
    return matchRegion && matchPackage;
  });

  const visible = filtered.slice(0, 6);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" };
      gsap.from(headingRef.current, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(filtersRef.current, { opacity: 0, y: 24, duration: 0.7, ease: "power3.out", delay: 0.18, scrollTrigger: trigger });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".dest-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 28, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.07 }
    );
  }, [region, pkg]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-6 lg:px-16 self-center"
      style={{ background: "var(--bg-page)", zIndex: 4, color: "var(--text-primary)", marginBottom: "8rem" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-default)" }} />

      {/* Header */}
      <div ref={headingRef} className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 rounded-full px-4 py-1 w-fit mb-5" style={{ border: "1px solid var(--border-default)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--azul-green)" }} />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-muted)" }}>Destinos</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight" style={{ color: "var(--azul-navy)" }}>
            Explore o<br /><em className="not-italic font-semibold">Mundo.</em>
          </h2>
        </div>
        <p className="text-sm max-w-xs lg:text-right" style={{ color: "var(--text-placeholder)" }}>
          {filtered.length} destino{filtered.length !== 1 ? "s" : ""} disponíve{filtered.length !== 1 ? "is" : "l"}.
        </p>
      </div>

      {/* Filtros */}
      <div ref={filtersRef} className="flex flex-col gap-3 mb-10">
        <div className="flex flex-wrap gap-2">
          {REGIONS.map(({ key, label }) => (
            <button key={key} onClick={() => setRegion(key as Region | "all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${region === key
                  ? "text-white"
                  : ""}`}
              style={region === key
                ? { background: "var(--azul-navy)", borderColor: "var(--azul-navy)", color: "white" }
                : { color: "var(--text-muted)", borderColor: "var(--border-default)" }}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {PACKAGES.map(({ key, label }) => (
            <button key={key} onClick={() => setPkg(key as Package | "all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200`}
              style={pkg === key
                ? { background: "var(--bg-blue-soft)", color: "var(--azul-blue)", borderColor: "var(--azul-blue)" }
                : { color: "var(--text-placeholder)", borderColor: "var(--border-default)" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-32 flex flex-col items-center gap-4" style={{ color: "var(--text-placeholder)" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
          </svg>
          <p className="text-sm">Nenhum destino encontrado.</p>
        </div>
      ) : (
        <>
          <div
            ref={gridRef}
            className="grid gap-3 bento-grid"
          >
            {visible.map((dest, i) => (
              <BentoCard key={`${dest.city}-${dest.region}`} dest={dest} slot={i} />
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              className="group flex items-center gap-3 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300"
              style={{ border: "1px solid var(--border-default)", color: "var(--text-muted)" }}
            >
              Ver todos os destinos
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center group-hover:text-white transition-all duration-300"
                style={{ border: "1px solid var(--border-default)" }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 7L7 1M7 1H2M7 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}

const SLOT_STYLE: { col: string; row: string; variant: "banner" | "tall" | "wide" }[] = [
  { col: "1 / span 5",  row: "1", variant: "banner" },
  { col: "6 / span 3",  row: "1", variant: "tall"   },
  { col: "9 / span 4",  row: "1", variant: "tall"   },
  { col: "1 / span 3",  row: "2", variant: "tall"   },
  { col: "4 / span 3",  row: "2", variant: "tall"   },
  { col: "7 / span 6",  row: "2", variant: "banner" },
];

function BentoCard({ dest, slot }: { dest: Destination; slot: number }) {
  const { col, row, variant } = SLOT_STYLE[slot] ?? SLOT_STYLE[0];
  const isBanner = variant === "banner";
  const bg     = REGION_BG[dest.region];
  const accent = REGION_ACCENT[dest.region];

  return (
    <div
      className="dest-card group relative overflow-hidden rounded-2xl cursor-pointer bento-card"
      style={{
        ["--col" as string]: col,
        ["--row" as string]: row,
        background: bg,
        border: `1px solid ${accent}22`,
      } as React.CSSProperties}
    >
      {/* Gradiente de luz */}
      <div
        className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}33, transparent 65%)` }}
      />

      {/* Tag */}
      {dest.tag && (
        <span
          className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
          style={{ background: "var(--azul-navy)" }}
        >
          {dest.tag}
        </span>
      )}

      {/* Duração */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
          <path d="M5 3v2.5l1.5 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        {dest.duration}
      </div>

      {/* Avião decorativo */}
      <svg
        className="absolute opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 -rotate-12"
        style={{ right: isBanner ? "5%" : "-10%", bottom: isBanner ? "10%" : "-10%", width: isBanner ? 140 : 100, height: isBanner ? 140 : 100 }}
        viewBox="0 0 24 24" fill="var(--azul-navy)"
      >
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2h0A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
      </svg>

      {/* Conteúdo */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div />

        <div className={`flex ${isBanner ? "flex-row items-end justify-between gap-4" : "flex-col gap-3"}`}>
          <div className="flex flex-col gap-1">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{dest.country}</p>
            <h3
              className="font-semibold tracking-tight leading-none"
              style={{ fontSize: isBanner ? "clamp(1.6rem, 3vw, 2.4rem)" : "1.35rem", color: "var(--azul-navy)" }}
            >
              {dest.city}
            </h3>

            {isBanner && dest.description && (
              <p className="text-xs mt-1 max-w-xs leading-relaxed
                opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                style={{ color: "var(--text-muted)" }}>
                {dest.description}
              </p>
            )}

            <div className="flex flex-wrap gap-1 mt-2">
              {dest.packages.filter(p => p !== "all").map((p) => (
                <span
                  key={p}
                  className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  {PKG_LABEL[p as Package]}
                </span>
              ))}
            </div>
          </div>

          <div className={`flex ${isBanner ? "flex-col items-end gap-2" : "flex-row items-center justify-between"} shrink-0`}>
            <div className={isBanner ? "text-right" : ""}>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-placeholder)" }}>a partir de</p>
              <p className="text-base font-semibold" style={{ color: "var(--azul-blue)" }}>R$ {dest.price.toLocaleString("pt-BR")}</p>
            </div>
            <button
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ background: accent }}
            >
              Reservar
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 7L7 1M7 1H2M7 1V6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
