"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import {
  Destination,
  PKG_LABEL,
  REGION_ACCENT,
  HIGHLIGHTS,
} from "./destinationsData";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

interface DestinationModalProps {
  dest: Destination;
  onClose: () => void;
}

const REGION_LABEL: Record<string, string> = {
  europe: "Europa", americas: "Américas", asia: "Ásia", africa: "África", oceania: "Oceania",
};

const CABIN_MULTIPLIER: Record<CartItem["cabinClass"], number> = {
  economy: 1, business: 1.7, first: 2.8,
};

const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

export default function DestinationModal({ dest, onClose }: DestinationModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const accent     = REGION_ACCENT[dest.region];
  const highlights = HIGHLIGHTS[dest.region];
  const { add, items } = useCart();

  const cabins = dest.packages.filter(p => p !== "all") as CartItem["cabinClass"][];
  const [cabin,      setCabin]      = useState<CartItem["cabinClass"]>(cabins[0]);
  const [passengers, setPassengers] = useState(1);
  const [added,      setAdded]      = useState(false);

  const alreadyInCart = items.some(i => i.dest.city === dest.city);
  const unitPrice  = dest.price * CABIN_MULTIPLIER[cabin];
  const totalPrice = unitPrice * passengers;
  const accentText = accent === "#E6A800" || accent === "#0B2E5E" ? "#0B2E5E" : "#fff";

  const close = useCallback(() => {
    if (!overlayRef.current || !panelRef.current) return;
    gsap.to(panelRef.current,   { y: 30, opacity: 0, duration: 0.28, ease: "power3.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(panelRef.current,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power4.out", delay: 0.06 }
    );
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleAdd = () => {
    add(dest, passengers, cabin);
    setAdded(true);
    setTimeout(close, 800);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(5,14,30,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
    >
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: "#fff",
          maxHeight: "92vh",
          boxShadow: "0 32px 80px rgba(5,14,30,0.45), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── HERO IMAGE ── */}
        <div className="relative shrink-0" style={{ height: 240 }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dest.image})` }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,14,30,0.88) 0%, rgba(5,14,30,0.1) 50%, transparent 100%)" }} />

          <button
            onClick={close}
            aria-label="Fechar"
            className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", transition: "background 180ms" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.4)")}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          {dest.tag && (
            <span
              className="absolute top-3.5 left-3.5 z-10 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "var(--azul-yellow)", color: "var(--azul-navy)" }}
            >
              {dest.tag}
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 z-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-1"
              style={{ color: accent === "#0B2E5E" ? "#7aabf7" : accent }}>
              {dest.country} · {REGION_LABEL[dest.region]}
            </p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-black text-white leading-none tracking-tight">{dest.city}</h2>
              <span className="text-white/60 text-sm font-medium pb-0.5">✈ {dest.duration}</span>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
          <div className="px-5 py-5 flex flex-col gap-5">

            {/* description */}
            {dest.description && (
              <p className="text-[14px] leading-relaxed" style={{ color: "#4A5568" }}>
                {dest.description}
              </p>
            )}

            {/* highlights */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2.5" style={{ color: "#9AA3B0" }}>Destaques</p>
              <div className="flex gap-2 flex-wrap">
                {highlights.map(({ icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full"
                    style={{ background: `${accent}12`, color: accent === "#0B2E5E" ? "#1a4a8a" : accent, border: `1px solid ${accent}25` }}
                  >
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "#EEF0F4" }} />

            {/* ── CABIN CLASS ── */}
            {cabins.length > 1 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#9AA3B0" }}>Classe</p>
                <div className="grid grid-cols-3 gap-2">
                  {cabins.map(c => {
                    const isActive = cabin === c;
                    const price = dest.price * CABIN_MULTIPLIER[c];
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCabin(c)}
                        className="flex flex-col items-start gap-1.5 p-3.5 rounded-2xl text-left"
                        style={{
                          transition: "all 160ms",
                          ...(isActive
                            ? { background: "#fff", border: `2px solid ${accent}`, boxShadow: `0 0 0 4px ${accent}15` }
                            : { background: "#F9FAFB", border: "1.5px solid #EEF0F4", boxShadow: "none" }),
                        }}
                      >
                        <span className="text-base">
                          {c === "economy" ? "🪑" : c === "business" ? "💼" : "⭐"}
                        </span>
                        <span
                          className="text-[12px] font-black block"
                          style={{ color: isActive ? (accent === "#0B2E5E" ? "#1a4a8a" : accent) : "#0B2E5E" }}
                        >
                          {PKG_LABEL[c]}
                        </span>
                        <span className="text-[11px] font-semibold" style={{ color: "#9AA3B0" }}>
                          {fmt(price)}/pax
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── PASSENGERS ── */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#9AA3B0" }}>Passageiros</p>
              <div className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: "#F9FAFB", border: "1.5px solid #EEF0F4" }}>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: "#0B2E5E" }}>
                    {passengers} {passengers === 1 ? "passageiro" : "passageiros"}
                  </p>
                  <p className="text-[11px]" style={{ color: "#9AA3B0" }}>
                    {fmt(unitPrice)} por pessoa
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: passengers === 1 ? "#F4F6FA" : "#EEF0F4", color: passengers === 1 ? "#C5CBD3" : "#0B2E5E", border: "1.5px solid #E5E7EB", transition: "all 150ms" }}
                  >−</button>
                  <span className="text-lg font-black w-5 text-center" style={{ color: "#0B2E5E" }}>{passengers}</span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: accent, color: accentText, border: `1.5px solid ${accent}`, transition: "all 150ms" }}
                  >+</button>
                </div>
              </div>
            </div>

            {/* spacer */}
            <div style={{ height: 72 }} />
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center gap-4"
          style={{ background: "#fff", borderTop: "1px solid #EEF0F4", boxShadow: "0 -8px 24px rgba(5,14,30,0.06)" }}
        >
          <div className="shrink-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "#9AA3B0" }}>total</p>
            <p className="text-[22px] font-black leading-none" style={{ color: "#0B2E5E", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
              {fmt(totalPrice)}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "#9AA3B0" }}>
              {passengers > 1 ? `${passengers} pax · ` : ""}{PKG_LABEL[cabin]}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className="flex-1 py-3.5 rounded-2xl font-black text-[13px] tracking-wide flex items-center justify-center gap-2"
            style={{
              background: added ? "#F0FDF4" : accent,
              color: added ? "#15803D" : accentText,
              border: added ? "1.5px solid #BBF7D0" : "none",
              boxShadow: added ? "none" : `0 6px 24px ${accent}55`,
              transition: "all 250ms",
            }}
          >
            {added ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7.5l3 3 6-6" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Adicionado ao carrinho!
              </>
            ) : alreadyInCart ? (
              <>
                Atualizar carrinho
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            ) : (
              <>
                Adicionar ao carrinho
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
