"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DESTINATIONS, REGIONS, Destination, Region, Package } from "./destinations/destinationsData";
import BentoCard from "./destinations/BentoCard";
import DestinationModal from "./destinations/DestinationModal";

gsap.registerPlugin(ScrollTrigger);

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const [region,   setRegion]   = useState<Region | "all">("all");
  const [pkg,      setPkg]      = useState<Package | "all">("all");
  const [selected, setSelected] = useState<Destination | null>(null);

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
            Para onde você{" "}<em className="not-italic font-semibold" style={{ color: "var(--azul-yellow)" }}>vai agora?</em>
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
            <button
              key={key}
              type="button"
              onClick={() => setRegion(key as Region | "all")}
              aria-pressed={region === key}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={region === key
                ? { background: "var(--azul-yellow)", borderColor: "var(--azul-yellow)", color: "var(--azul-navy)" }
                : { color: "var(--text-muted)", borderColor: "var(--border-default)" }}
            >
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
          <div ref={gridRef} className="grid gap-3 bento-grid">
            {visible.map((dest, i) => (
              <BentoCard key={`${dest.city}-${dest.region}`} dest={dest} slot={i} onOpen={setSelected} />
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              className="group flex items-center gap-3 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300"
              style={{ border: "1px solid var(--border-default)", color: "var(--text-muted)" }}
            >
              Ver todos os {filtered.length}+ destinos
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

      {selected && <DestinationModal dest={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
