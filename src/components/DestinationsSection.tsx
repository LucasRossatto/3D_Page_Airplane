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
  image: string;
}

const DESTINATIONS: Destination[] = [
  { city: "Paris",        country: "França",       region: "europe",   packages: ["economy","business","first"], duration: "10h", price: 2800, tag: "Mais Popular", featured: true,  description: "Arte, gastronomia e a Torre Eiffel iluminada.",  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { city: "Tóquio",       country: "Japão",        region: "asia",     packages: ["economy","business","first"], duration: "24h", price: 5200, tag: "Novo",          featured: true,  description: "Tradição milenar e futurismo lado a lado.",      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { city: "Nova York",    country: "EUA",          region: "americas", packages: ["economy","business","first"], duration: "9h",  price: 3400,                       featured: true,  description: "A cidade que nunca dorme.",                      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80" },
  { city: "Dubai",        country: "Emirados",     region: "asia",     packages: ["business","first"],           duration: "14h", price: 6800, tag: "Luxo",                           description: "Luxo no deserto.",                               image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { city: "Sydney",       country: "Austrália",    region: "oceania",  packages: ["economy","business","first"], duration: "27h", price: 6200,                                        description: "Opera House e Bondi Beach.",                     image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80" },
  { city: "Cape Town",    country: "África do Sul",region: "africa",   packages: ["economy","business","first"], duration: "16h", price: 4400, tag: "Novo",                           description: "Table Mountain e vinhedos.",                     image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80" },
  { city: "Roma",         country: "Itália",       region: "europe",   packages: ["economy","business"],         duration: "11h", price: 2400,                                        description: "Coliseu e gelato autêntico.",                    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80" },
  { city: "Bangkok",      country: "Tailândia",    region: "asia",     packages: ["economy","business"],         duration: "22h", price: 4100,                                        description: "Templos dourados e street food.",                image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80" },
  { city: "Miami",        country: "EUA",          region: "americas", packages: ["economy","business"],         duration: "8h",  price: 2900,                                        description: "Praias, art déco e vida noturna.",               image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { city: "Lisboa",       country: "Portugal",     region: "europe",   packages: ["economy"],                    duration: "9h",  price: 1900,                                        description: "Fados, pastéis e o Tejo.",                       image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" },
  { city: "Buenos Aires", country: "Argentina",    region: "americas", packages: ["economy"],                    duration: "3h",  price: 1100,                                        description: "Tango e parrilla.",                              image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80" },
  { city: "Cingapura",    country: "Singapura",    region: "asia",     packages: ["economy","business","first"], duration: "23h", price: 4700,                                        description: "Marina Bay e Gardens by the Bay.",               image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80" },
  { city: "Amsterdã",     country: "Holanda",      region: "europe",   packages: ["economy","business"],         duration: "12h", price: 2600,                                        description: "Canais, museus e tulipas.",                      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80" },
  { city: "Istambul",     country: "Turquia",      region: "europe",   packages: ["economy","business","first"], duration: "13h", price: 3100, tag: "Novo",                           description: "Entre Europa e Ásia, Hagia Sophia e o Bósforo.", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" },
  { city: "Marrakech",    country: "Marrocos",     region: "africa",   packages: ["economy","business"],         duration: "11h", price: 2200,                                        description: "Souks, riad e o deserto do Saara.",              image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80" },
  { city: "Bali",         country: "Indonésia",    region: "asia",     packages: ["economy","business"],         duration: "26h", price: 4300,                                        description: "Templos, arrozais e praias de tirar o fôlego.",  image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
  { city: "Cancún",       country: "México",       region: "americas", packages: ["economy","business"],         duration: "7h",  price: 2100,                                        description: "Caribe turquesa, ruínas maias e cenotes.",       image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&q=80" },
  { city: "Praga",        country: "Rep. Tcheca",  region: "europe",   packages: ["economy"],                    duration: "13h", price: 2300,                                        description: "Cidade medieval, pontes históricas e cerveja.",  image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80" },
  { city: "Nairobi",      country: "Quênia",       region: "africa",   packages: ["economy","business"],         duration: "14h", price: 3800, tag: "Novo",                           description: "Safari no Masai Mara e vida selvagem única.",    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80" },
  { city: "Vancouver",    country: "Canadá",       region: "americas", packages: ["economy","business","first"], duration: "11h", price: 3600,                                        description: "Montanhas, oceano e a cidade mais verde do mundo.", image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&q=80" },
  { city: "Seul",         country: "Coreia do Sul",region: "asia",     packages: ["economy","business","first"], duration: "22h", price: 4900, tag: "Novo",                           description: "K-pop, gastronomia e templos milenares.",        image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80" },
  { city: "Barcelona",    country: "Espanha",      region: "europe",   packages: ["economy","business"],         duration: "11h", price: 2500,                                        description: "Gaudí, praias e a vibrante vida noturna.",       image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80" },
  { city: "Montevidéu",   country: "Uruguai",      region: "americas", packages: ["economy"],                    duration: "3h",  price: 980,                                         description: "Rambla, charme colonial e o melhor churrasco.",  image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&q=80" },
  { city: "Auckland",     country: "Nova Zelândia",region: "oceania",  packages: ["economy","business"],         duration: "29h", price: 6800,                                        description: "Hobbiton, fiordes e natureza selvagem.",         image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80" },
  { city: "Cairo",        country: "Egito",        region: "africa",   packages: ["economy","business"],         duration: "12h", price: 2700, tag: "Novo",                           description: "Pirâmides de Gizé e o Rio Nilo.",               image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80" },
  { city: "Zanzibar",     country: "Tanzânia",     region: "africa",   packages: ["economy","business"],         duration: "16h", price: 4100,                                        description: "Praias brancas, especiarias e cultura swahili.", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80" },
  { city: "Lagos",        country: "Nigéria",      region: "africa",   packages: ["economy"],                    duration: "10h", price: 2900,                                        description: "A maior metrópole africana, vibrante e diversa.", image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80" },
  { city: "Melbourne",    country: "Austrália",    region: "oceania",  packages: ["economy","business","first"], duration: "27h", price: 6400,                                        description: "Café, arte de rua e o Grand Prix.",             image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80" },
  { city: "Fiji",         country: "Fiji",         region: "oceania",  packages: ["economy","business"],         duration: "22h", price: 5900, tag: "Luxo",                           description: "Ilhas de coral, lagoas cristalinas e resorts.",  image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80" },
  { city: "Queenstown",   country: "Nova Zelândia",region: "oceania",  packages: ["economy","business"],         duration: "30h", price: 7100,                                        description: "Capital mundial dos esportes radicais.",         image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { city: "Papeete",      country: "Polinésia Fr.", region: "oceania", packages: ["business","first"],           duration: "25h", price: 8200, tag: "Luxo",                           description: "Bungalôs sobre a água e lagoas turquesa.",       image: "https://images.unsplash.com/photo-1738692620483-e4255eb3e80a?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80" },
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" };
      gsap.from(headingRef.current, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(filtersRef.current, { opacity: 0, y: 24, duration: 0.7, ease: "power3.out", delay: 0.18, scrollTrigger: trigger });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight" style={{ color: "var(--azul-navy)" }}>
            Explore o <em className="not-italic font-semibold" style={{ color: "var(--azul-yellow)" }}>Mundo.</em>
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
            <button key={key} type="button" onClick={() => setRegion(key as Region | "all")}
              aria-pressed={region === key}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${region === key
                  ? "text-white"
                  : ""}`}
              style={region === key
                ? { background: "var(--azul-yellow)", borderColor: "var(--azul-yellow)", color: "white" }
                : { color: "var(--text-muted)", borderColor: "var(--border-default)" }}>
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
  const accent = REGION_ACCENT[dest.region];

  return (
    <div
      className="dest-card group relative overflow-hidden rounded-2xl cursor-pointer bento-card"
      style={{
        ["--col" as string]: col,
        ["--row" as string]: row,
      } as React.CSSProperties}
    >
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${dest.image})` }}
      />

      {/* Overlay escuro base */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />

      {/* Gradiente de texto na base */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
      />

      {/* Tag */}
      {dest.tag && (
        <span
          className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white backdrop-blur-sm"
          style={{ background: "var(--azul-yellow)", border: "none" }}
        >
          {dest.tag}
        </span>
      )}

      {/* Duração */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[10px] text-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.3)" }}>
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
          <path d="M5 3v2.5l1.5 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        {dest.duration}
      </div>

      {/* Conteúdo */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
        <div className={`flex ${isBanner ? "flex-row items-end justify-between gap-4" : "flex-col gap-3"}`}>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] text-white/60">{dest.country}</p>
            <h3
              className="font-semibold tracking-tight leading-none text-white"
              style={{ fontSize: isBanner ? "clamp(1.6rem, 3vw, 2.4rem)" : "1.25rem" }}
            >
              {dest.city}
            </h3>

            {isBanner && dest.description && (
              <p className="text-xs mt-1 max-w-xs leading-relaxed text-white/70
                opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {dest.description}
              </p>
            )}

            <div className="flex flex-wrap gap-1 mt-2">
              {dest.packages.filter(p => p !== "all").map((p) => (
                <span
                  key={p}
                  className="text-[9px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
                >
                  {PKG_LABEL[p as Package]}
                </span>
              ))}
            </div>
          </div>

          <div className={`flex ${isBanner ? "flex-col items-end gap-2" : "flex-row items-center justify-between"} shrink-0`}>
            <div className={isBanner ? "text-right" : ""}>
              <p className="text-[9px] uppercase tracking-wider text-white/50">a partir de</p>
              <p className="text-base font-semibold text-white">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(dest.price)}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Reservar voo para ${dest.city}`}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 backdrop-blur-sm"
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
