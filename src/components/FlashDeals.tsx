"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Deal {
  id: string;
  from: string;
  to: string;
  toCode: string;
  flag: string;
  originalPrice: number;
  salePrice: number;
  expiresIn: number; // seconds
  airline: string;
  date: Date;
}

const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(d);

const DEALS: Deal[] = [
  { id: "1", from: "GRU", to: "Paris",      toCode: "CDG", flag: "🇫🇷", originalPrice: 4200, salePrice: 2799, expiresIn: 3 * 3600 + 22 * 60 + 10, airline: "Air France",   date: new Date(2026, 6, 15) },
  { id: "2", from: "GRU", to: "Tóquio",     toCode: "NRT", flag: "🇯🇵", originalPrice: 7800, salePrice: 4990, expiresIn: 1 * 3600 + 47 * 60 + 33, airline: "JAL",          date: new Date(2026, 7, 22) },
  { id: "3", from: "GRU", to: "Nova York",  toCode: "JFK", flag: "🇺🇸", originalPrice: 5100, salePrice: 3199, expiresIn: 5 * 3600 + 8 * 60 + 55,  airline: "LATAM",        date: new Date(2026, 6, 10) },
  { id: "4", from: "GRU", to: "Lisboa",     toCode: "LIS", flag: "🇵🇹", originalPrice: 3400, salePrice: 1899, expiresIn: 0 * 3600 + 58 * 60 + 21, airline: "TAP",          date: new Date(2026, 7, 3)  },
  { id: "5", from: "GRU", to: "Dubai",      toCode: "DXB", flag: "🇦🇪", originalPrice: 9200, salePrice: 6490, expiresIn: 2 * 3600 + 33 * 60 + 44, airline: "Emirates",     date: new Date(2026, 8, 18) },
  { id: "6", from: "GRU", to: "Barcelona",  toCode: "BCN", flag: "🇪🇸", originalPrice: 4800, salePrice: 2599, expiresIn: 4 * 3600 + 15 * 60 + 0,  airline: "Iberia",       date: new Date(2026, 6, 28) },
];

const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

function useCountdown(initialSeconds: number) {
  const [secs, setSecs] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return { h, m, s, urgent: secs < 3600 };
}

function DealCard({ deal }: { deal: Deal }) {
  const { h, m, s, urgent } = useCountdown(deal.expiresIn);
  const discount = Math.round((1 - deal.salePrice / deal.originalPrice) * 100);

  return (
    <div
      className="shrink-0 flex flex-col gap-4 p-5 rounded-3xl relative overflow-hidden group"
      style={{
        width: 280,
        background: "#fff",
        border: "1px solid #EEF0F4",
        boxShadow: "0 2px 16px rgba(11,46,94,0.06)",
        transition: "transform 250ms, box-shadow 250ms",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(11,46,94,0.14)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(11,46,94,0.06)"; }}
    >
      {/* Discount badge */}
      <div
        className="absolute top-4 right-4 text-[11px] font-black px-2.5 py-1 rounded-full"
        style={{ background: "#FFF0EB", color: "#FF6B35" }}
      >
        −{discount}%
      </div>

      {/* Route */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest" style={{ color: "#9AA3B0" }}>{deal.from}</span>
          <div className="flex-1 flex items-center gap-1">
            <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, #DCE2E8 0px, #DCE2E8 4px, transparent 4px, transparent 8px)" }} />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DCE2E8" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xs font-bold tracking-widest" style={{ color: "#9AA3B0" }}>{deal.toCode}</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl mr-1">{deal.flag}</span>
            <span className="text-xl font-black" style={{ color: "#0B2E5E" }}>{deal.to}</span>
          </div>
          <span className="text-[11px] font-medium pb-0.5" style={{ color: "#9AA3B0" }}>{fmtDate(deal.date)}</span>
        </div>
        <span className="text-[11px]" style={{ color: "#9AA3B0" }}>{deal.airline} · ida e volta</span>
      </div>

      {/* Price */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] line-through" style={{ color: "#C5CBD3" }}>{fmt(deal.originalPrice)}</p>
          <p className="text-2xl font-black leading-none" style={{ color: "#0B2E5E", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
            {fmt(deal.salePrice)}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "#9AA3B0" }}>por pessoa</p>
        </div>

        {/* Countdown */}
        <div
          className="flex flex-col items-end gap-1 rounded-2xl px-3 py-2"
          style={{ background: urgent ? "#FFF0EB" : "#F4F6FA" }}
        >
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: urgent ? "#FF6B35" : "#9AA3B0" }}>
            {urgent ? "⚡ urgente" : "expira em"}
          </span>
          <span
            className="text-[15px] font-black tabular-nums leading-none"
            style={{ color: urgent ? "#FF6B35" : "#0B2E5E", fontVariantNumeric: "tabular-nums" }}
          >
            {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        className="w-full py-3 rounded-2xl font-bold text-[13px] flex items-center justify-center gap-2 group-hover:gap-3"
        style={{
          background: "var(--azul-navy)",
          color: "#fff",
          transition: "gap 200ms, background 200ms",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#0d3570")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--azul-navy)")}
      >
        Reservar por este preço
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default function FlashDeals() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" };
      gsap.from(headRef.current, { opacity: 0, y: 32, duration: 0.8, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(trackRef.current!.children, {
        opacity: 0, x: 40, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.2,
        scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 overflow-hidden"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-default)" }} />

      {/* Header */}
      <div ref={headRef} className="flex items-end justify-between px-6 lg:px-16 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {/* Live pulse */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#FF6B35" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#FF6B35" }} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#FF6B35" }}>Ofertas relâmpago</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light leading-tight tracking-tight" style={{ color: "var(--azul-navy)" }}>
            Tarifas que somem{" "}
            <em className="not-italic font-semibold" style={{ color: "var(--azul-yellow)" }}>em horas.</em>
          </h2>
        </div>
        <p className="hidden sm:block text-sm text-right max-w-[200px]" style={{ color: "var(--text-muted)" }}>
          Preços atualizados a cada hora. Quando acabar, acabou.
        </p>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 px-6 lg:px-16 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {DEALS.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-24" style={{ background: "linear-gradient(to left, var(--bg-page), transparent)" }} />
    </section>
  );
}
