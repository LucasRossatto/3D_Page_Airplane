"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useCart, CartItem } from "@/context/CartContext";
import { PKG_LABEL, REGION_ACCENT } from "@/components/destinations/destinationsData";

const CABIN_MULTIPLIER: Record<CartItem["cabinClass"], number> = {
  economy: 1,
  business: 1.7,
  first: 2.8,
};

const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

const fmtFull = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(v);

function PassengerStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
        style={{ background: "#F4F6FA", color: "#0B2E5E", border: "1.5px solid #E5E7EB" }}
      >−</button>
      <span className="text-sm font-bold w-4 text-center" style={{ color: "#0B2E5E" }}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(9, value + 1))}
        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
        style={{ background: "#F4F6FA", color: "#0B2E5E", border: "1.5px solid #E5E7EB" }}
      >+</button>
    </div>
  );
}

function CartItemRow({ item, onRemove, onUpdatePassengers, onUpdateCabin }: {
  item: CartItem;
  onRemove: () => void;
  onUpdatePassengers: (n: number) => void;
  onUpdateCabin: (c: CartItem["cabinClass"]) => void;
}) {
  const accent = REGION_ACCENT[item.dest.region];
  const multiplier = CABIN_MULTIPLIER[item.cabinClass];
  const unitPrice = item.dest.price * multiplier;
  const subtotal  = unitPrice * item.passengers;
  const cabins    = item.dest.packages.filter(p => p !== "all") as CartItem["cabinClass"][];

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl" style={{ background: "#F9FAFB", border: "1px solid #EEF0F4" }}>
      {/* top: foto + info + remove */}
      <div className="flex gap-3 items-start">
        <div
          className="shrink-0 w-16 h-16 rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${item.dest.image})` }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#9AA3B0" }}>
                {item.dest.country}
              </p>
              <h3 className="text-[15px] font-black leading-tight" style={{ color: "#0B2E5E" }}>
                {item.dest.city}
              </h3>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: "#FEE2E2", color: "#EF4444" }}
              aria-label="Remover"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>
              ✈ {item.dest.duration}
            </span>
          </div>
        </div>
      </div>

      {/* cabin selector */}
      {cabins.length > 1 && (
        <div className="flex gap-1.5">
          {cabins.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => onUpdateCabin(c)}
              className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex-1"
              style={{
                transition: "all 150ms",
                ...(item.cabinClass === c
                  ? { background: accent, color: "#fff", border: `1.5px solid ${accent}` }
                  : { background: "#fff", color: "#9AA3B0", border: "1.5px solid #E5E7EB" }),
              }}
            >
              {PKG_LABEL[c]}
            </button>
          ))}
        </div>
      )}

      {/* passengers + price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px]" style={{ color: "#9AA3B0" }}>Passageiros</span>
          <PassengerStepper value={item.passengers} onChange={onUpdatePassengers} />
        </div>
        <div className="text-right">
          <p className="text-[10px]" style={{ color: "#9AA3B0" }}>{fmt(unitPrice)} / pessoa</p>
          <p className="text-[15px] font-black" style={{ color: "#0B2E5E", fontVariantNumeric: "tabular-nums" }}>
            {fmt(subtotal)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { items, remove, updatePassengers, updateCabin, clear, total, isOpen, closeCart } = useCart();
  const drawerRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setCheckout(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(drawerRef.current,  { x: "100%" }, { x: "0%", duration: 0.4, ease: "power4.out" });
    }
  }, [mounted, isOpen]);

  const handleClose = () => {
    document.body.style.overflow = "";
    gsap.to(drawerRef.current,  { x: "100%", duration: 0.32, ease: "power3.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.28, ease: "power2.in", onComplete: () => { setMounted(false); closeCart(); } });
  };

  if (!mounted) return null;

  const savings = items.reduce((s, i) => s + i.dest.price * CABIN_MULTIPLIER[i.cabinClass] * i.passengers * 0.08, 0);

  return (
    <>
      {/* overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(5,14,30,0.5)", backdropFilter: "blur(4px)" }}
        onClick={handleClose}
      />

      {/* drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 bottom-0 z-[61] flex flex-col"
        style={{
          width: "min(480px, 100vw)",
          background: "#fff",
          boxShadow: "-24px 0 80px rgba(5,14,30,0.2)",
        }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #EEF0F4" }}>
          <div>
            <h2 className="text-lg font-black" style={{ color: "#0B2E5E" }}>Sua viagem</h2>
            <p className="text-[12px]" style={{ color: "#9AA3B0" }}>
              {items.length === 0 ? "Nenhum destino selecionado" : `${items.length} destino${items.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "#F4F6FA", border: "1.5px solid #E5E7EB" }}
            aria-label="Fechar carrinho"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="#0B2E5E" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#F4F6FA" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5CBD3" strokeWidth="1.2">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-base" style={{ color: "#0B2E5E" }}>Nenhuma viagem ainda</p>
              <p className="text-sm mt-1" style={{ color: "#9AA3B0" }}>Explore os destinos e adicione ao carrinho</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 rounded-2xl text-sm font-bold"
              style={{ background: "var(--azul-navy)", color: "#fff" }}
            >
              Explorar destinos
            </button>
          </div>
        ) : checkout ? (
          <CheckoutView total={total} savings={savings} items={items} onBack={() => setCheckout(false)} onClose={handleClose} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
              {items.map(item => (
                <CartItemRow
                  key={item.dest.city}
                  item={item}
                  onRemove={() => remove(item.dest.city)}
                  onUpdatePassengers={(n) => updatePassengers(item.dest.city, n)}
                  onUpdateCabin={(c) => updateCabin(item.dest.city, c)}
                />
              ))}

              {/* promo badge */}
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "#F0FDF4", border: "1.5px solid #BBF7D0" }}>
                <span className="text-lg">🎉</span>
                <p className="text-[12px] font-semibold" style={{ color: "#15803D" }}>
                  Você economiza <strong>{fmt(savings)}</strong> reservando pelo VoaLá
                </p>
              </div>
            </div>

            {/* footer */}
            <div className="px-6 py-5 flex flex-col gap-4" style={{ borderTop: "1px solid #EEF0F4" }}>
              {/* summary */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm" style={{ color: "#9AA3B0" }}>
                  <span>Subtotal</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: "#15803D" }}>
                  <span>Desconto VoaLá</span>
                  <span>− {fmt(savings)}</span>
                </div>
                <div style={{ height: 1, background: "#EEF0F4", margin: "2px 0" }} />
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold" style={{ color: "#0B2E5E" }}>Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: "#0B2E5E", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
                      {fmtFull(total - savings)}
                    </p>
                    <p className="text-[10px]" style={{ color: "#9AA3B0" }}>todos os impostos incluídos</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckout(true)}
                className="w-full py-4 rounded-2xl font-black text-[14px] tracking-wide flex items-center justify-center gap-2"
                style={{ background: "var(--azul-navy)", color: "#fff", boxShadow: "0 8px 32px rgba(11,46,94,0.35)", transition: "opacity 150ms, transform 150ms" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Finalizar reserva
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                type="button"
                onClick={clear}
                className="text-[11px] text-center"
                style={{ color: "#C5CBD3", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
                onMouseLeave={e => (e.currentTarget.style.color = "#C5CBD3")}
              >
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── Checkout view ── */
const PAYMENT_METHODS_CHECKOUT = [
  { label: "Visa",       max: 12 },
  { label: "Mastercard", max: 12 },
  { label: "Elo",        max: 10 },
  { label: "Amex",       max: 6  },
  { label: "Pix",        max: 1  },
];

const INSTALLMENT_OPTIONS = [1, 2, 3, 6, 10, 12];

function CheckoutView({ total, savings, items, onBack, onClose }: {
  total: number; savings: number; items: CartItem[]; onBack: () => void; onClose: () => void;
}) {
  const [activePayment, setActivePayment] = useState("Visa");
  const [installments, setInstallments] = useState(12);
  const [done, setDone] = useState(false);
  const { clear } = useCart();

  const isPix = activePayment === "Pix";
  const maxInst = PAYMENT_METHODS_CHECKOUT.find(p => p.label === activePayment)?.max ?? 1;
  const safeInst = Math.min(installments, maxInst);
  const finalTotal = total - savings;
  const instValue = finalTotal / safeInst;
  const available = INSTALLMENT_OPTIONS.filter(n => n <= maxInst);

  if (done) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "#F0FDF4", border: "2px solid #BBF7D0" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-black" style={{ color: "#0B2E5E" }}>Reserva confirmada!</h3>
          <p className="text-sm mt-1" style={{ color: "#9AA3B0" }}>
            {items.length} destino{items.length > 1 ? "s" : ""} reservado{items.length > 1 ? "s" : ""}.<br/>Você receberá a confirmação por e-mail.
          </p>
        </div>
        <div className="w-full rounded-2xl p-4 flex flex-col gap-2" style={{ background: "#F9FAFB", border: "1px solid #EEF0F4" }}>
          {items.map(i => (
            <div key={i.dest.city} className="flex items-center justify-between text-sm">
              <span className="font-semibold" style={{ color: "#0B2E5E" }}>{i.dest.city}</span>
              <span style={{ color: "#9AA3B0" }}>{i.passengers} pax · {PKG_LABEL[i.cabinClass]}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => { clear(); onClose(); }}
          className="w-full py-4 rounded-2xl font-black text-sm"
          style={{ background: "var(--azul-navy)", color: "#fff" }}
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-4 text-sm font-semibold"
        style={{ color: "#9AA3B0", borderBottom: "1px solid #EEF0F4" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Voltar ao carrinho
      </button>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5" style={{ scrollbarWidth: "none" }}>

        {/* resumo compacto */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#9AA3B0" }}>Resumo da reserva</p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EEF0F4" }}>
            {items.map((item, i) => {
              const mult = CABIN_MULTIPLIER[item.cabinClass];
              const sub = item.dest.price * mult * item.passengers;
              return (
                <div
                  key={item.dest.city}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ borderTop: i > 0 ? "1px solid #EEF0F4" : "none" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${item.dest.image})` }} />
                  <div className="flex-1">
                    <p className="text-[13px] font-bold" style={{ color: "#0B2E5E" }}>{item.dest.city}</p>
                    <p className="text-[10px]" style={{ color: "#9AA3B0" }}>{item.passengers} pax · {PKG_LABEL[item.cabinClass]}</p>
                  </div>
                  <p className="text-[13px] font-black" style={{ color: "#0B2E5E" }}>{fmt(sub)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* pagamento */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#9AA3B0" }}>Forma de pagamento</p>
          <div className="flex gap-2 flex-wrap">
            {PAYMENT_METHODS_CHECKOUT.map(({ label }) => (
              <button
                key={label}
                type="button"
                onClick={() => { setActivePayment(label); if (label === "Pix") setInstallments(1); }}
                className="text-[12px] font-bold px-3.5 py-2 rounded-xl"
                style={{
                  transition: "all 150ms",
                  ...(activePayment === label
                    ? { background: "var(--azul-navy)", color: "#fff", border: "1.5px solid var(--azul-navy)" }
                    : { background: "#F4F6FA", color: "#6B7280", border: "1.5px solid #E5E7EB" }),
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {!isPix ? (
            <div className="flex flex-col gap-2">
              <p className="text-[11px]" style={{ color: "#9AA3B0" }}>
                {activePayment} — até {maxInst}x sem juros
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {available.map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setInstallments(n)}
                    className="text-[12px] font-semibold px-3 py-1.5 rounded-lg"
                    style={{
                      transition: "all 150ms",
                      ...(safeInst === n
                        ? { background: "var(--azul-navy)", color: "#fff", border: "1.5px solid var(--azul-navy)" }
                        : { background: "transparent", color: "#9AA3B0", border: "1.5px solid #E5E7EB" }),
                    }}
                  >
                    {n}x
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#F0FDF4", border: "1.5px solid #BBF7D0" }}>
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-[13px] font-bold" style={{ color: "#15803D" }}>Pix — aprovação instantânea</p>
                <p className="text-[11px]" style={{ color: "#16A34A" }}>Confirmação em segundos · sem taxas</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ height: 8 }} />
      </div>

      {/* bottom */}
      <div className="px-6 py-5 flex flex-col gap-3" style={{ borderTop: "1px solid #EEF0F4" }}>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "#9AA3B0" }}>
              {isPix ? "à vista" : `${safeInst}x de`}
            </p>
            <p className="text-2xl font-black" style={{ color: "#0B2E5E", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
              {isPix ? fmtFull(finalTotal) : fmtFull(instValue)}
            </p>
            {!isPix && (
              <p className="text-[10px]" style={{ color: "#9AA3B0" }}>total {fmtFull(finalTotal)} sem juros</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold" style={{ color: "#15803D" }}>✓ Economizando {fmt(savings)}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDone(true)}
          className="w-full py-4 rounded-2xl font-black text-[14px] tracking-wide flex items-center justify-center gap-2"
          style={{ background: "var(--azul-yellow)", color: "var(--azul-navy)", boxShadow: "0 8px 32px rgba(255,200,1,0.4)", transition: "opacity 150ms, transform 150ms" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Confirmar reserva
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 13l4-4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="text-center text-[10px]" style={{ color: "#C5CBD3" }}>
          ✓ Cancelamento em 24h &nbsp;·&nbsp; ✓ Sem taxas ocultas
        </p>
      </div>
    </div>
  );
}
