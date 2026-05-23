"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POPULAR_DESTINATIONS = [
  "Paris", "Tóquio", "Nova York", "Lisboa", "Dubai",
  "Barcelona", "Sydney", "Miami", "Bali", "Cancún",
];

export default function NewsletterAlert() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const [email, setEmail]   = useState("");
  const [dest,  setDest]    = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0, y: 48, duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Digite um e-mail válido."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-6 lg:px-16"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-default)" }} />

      <div
        ref={cardRef}
        className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden"
        style={{ background: "var(--azul-navy)" }}
      >
        {/* Background radial glow */}
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: "radial-gradient(ellipse at 70% 50%, rgba(255,200,1,0.08) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(45,123,196,0.12) 0%, transparent 50%)"
        }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 lg:p-12">

          {/* Left: copy */}
          <div className="flex flex-col gap-4 lg:w-[45%]">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔔</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--azul-yellow)" }}>
                Alerta de tarifas
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light leading-[1.1] tracking-tight text-white">
              Avise-me quando{" "}
              <em className="not-italic font-semibold" style={{ color: "var(--azul-yellow)" }}>o preço cair.</em>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Escolha o destino e a gente te manda um e-mail na hora que a tarifa baixar. Sem spam — só o que importa.
            </p>
            {/* Trust micro-proof */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex -space-x-2">
                {["#FFC801","#2D7BC4","#3BAA35","#FF6B35"].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white" style={{ borderColor: "var(--azul-navy)", background: c }}>
                    {["A","B","C","D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                +12.400 viajantes já recebem alertas
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full lg:flex-1">
            {submitted ? (
              <div
                className="flex flex-col items-center gap-4 py-10 px-6 rounded-2xl text-center"
                style={{ background: "rgba(59,170,53,0.1)", border: "1.5px solid rgba(59,170,53,0.25)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(59,170,53,0.2)" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5 9-9" stroke="#3BAA35" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-black text-base text-white">Alerta ativado!</p>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Vamos te avisar assim que o preço para <strong className="text-white">{dest || "seu destino"}</strong> cair. Fique de olho no e-mail.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
                aria-label="Formulário de alerta de tarifas"
                noValidate
              >
                {/* Email input */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="alert-email" className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Seu e-mail
                  </label>
                  <input
                    id="alert-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="voce@email.com…"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: `1.5px solid ${error ? "rgba(255,107,53,0.6)" : "rgba(255,255,255,0.12)"}`,
                      color: "#fff",
                      transition: "border-color 180ms",
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(255,200,1,0.5)")}
                    onBlur={e => (e.target.style.borderColor = error ? "rgba(255,107,53,0.6)" : "rgba(255,255,255,0.12)")}
                  />
                  {error && (
                    <p className="text-[11px]" style={{ color: "#FF6B35" }} aria-live="polite">{error}</p>
                  )}
                </div>

                {/* Destination select */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="alert-dest" className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Destino favorito (opcional)
                  </label>
                  <select
                    id="alert-dest"
                    name="destination"
                    value={dest}
                    onChange={e => setDest(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none appearance-none"
                    style={{
                      background: "#0B2E5E",
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      color: dest ? "#fff" : "rgba(255,255,255,0.35)",
                      transition: "border-color 180ms",
                    }}
                  >
                    <option value="" style={{ background: "#0B2E5E" }}>Qualquer destino…</option>
                    {POPULAR_DESTINATIONS.map(d => (
                      <option key={d} value={d} style={{ background: "#0B2E5E" }}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-black text-[13px] tracking-wide flex items-center justify-center gap-2 mt-1"
                  style={{
                    background: loading ? "rgba(255,200,1,0.6)" : "var(--azul-yellow)",
                    color: "var(--azul-navy)",
                    boxShadow: loading ? "none" : "0 6px 24px rgba(255,200,1,0.35)",
                    transition: "background 200ms, box-shadow 200ms, transform 150ms",
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" strokeDasharray="20" strokeDashoffset="10" strokeLinecap="round"/>
                      </svg>
                      Ativando alerta…
                    </>
                  ) : (
                    <>
                      Quero receber o alerta
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                        <path d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Sem spam · Cancele quando quiser · Grátis para sempre
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
