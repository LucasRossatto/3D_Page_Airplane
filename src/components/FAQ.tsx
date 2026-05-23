"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "Posso cancelar minha reserva sem custo?",
    a: "Sim. Toda reserva feita pelo VoaLá permite cancelamento gratuito em até 24 horas após a confirmação. Após esse prazo, aplicam-se as políticas da companhia aérea escolhida — que ficam visíveis antes de você finalizar a compra.",
  },
  {
    q: "Quantas bagagens estão incluídas no bilhete?",
    a: "Depende da classe e da companhia. Economy geralmente inclui 1 bagagem de mão (até 10 kg). Business inclui 1 bagagem despachada (23 kg). Primeira Classe inclui 2 bagagens despachadas. As especificações exatas ficam descritas em cada oferta.",
  },
  {
    q: "Posso parcelar sem juros?",
    a: "Sim! Aceitamos Visa, Mastercard e Elo em até 12x sem juros, Amex em até 6x. Pelo Pix você recebe 5% de desconto adicional à vista. O valor das parcelas é exibido antes de finalizar a compra.",
  },
  {
    q: "Como funciona o acúmulo de milhas?",
    a: "A cada R$ 1 gasto em reservas pelo VoaLá você acumula milhas automaticamente: nível Prata (1 milha/R$1), Ouro (1,5 milha/R$1) e Diamante (2 milhas/R$1). As milhas nunca expiram enquanto sua conta estiver ativa.",
  },
  {
    q: "Posso alterar a data da viagem após a compra?",
    a: "Alterações de data são possíveis e dependem da política tarifária do bilhete adquirido. Tarifas flexíveis permitem uma alteração gratuita em até 7 dias antes do voo. Para tarifas promocionais, pode haver taxa de remarcação. Sempre indicamos o tipo de tarifa antes da compra.",
  },
  {
    q: "O site é seguro para fazer pagamentos?",
    a: "Sim. Usamos criptografia SSL em todas as transações, e os dados do cartão são processados por gateways certificados PCI-DSS (Stripe e Adyen). Nunca armazenamos o número completo do seu cartão.",
  },
  {
    q: "O que acontece se o voo for cancelado pela companhia?",
    a: "Em caso de cancelamento pela companhia aérea, você tem direito a reembolso integral ou reacomodação em outro voo sem custo extra. Nossa equipe de suporte 24/7 entra em contato proativamente e resolve por você.",
  },
  {
    q: "Tem suporte em português?",
    a: "Sim, 100%. Nosso suporte funciona por chat, e-mail e telefone em português do Brasil, 24 horas por dia, 7 dias por semana para membros Ouro e Diamante — e das 8h às 22h para membros Prata.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!bodyRef.current) return;
    if (!open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.32, ease: "power3.out" }
      );
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.24, ease: "power3.in" });
    }
    setOpen(v => !v);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: open ? "1.5px solid var(--azul-blue)" : "1.5px solid var(--border-default)",
        background: open ? "var(--bg-blue-soft)" : "#fff",
        transition: "border-color 200ms, background 200ms",
      }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`faq-body-${index}`}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[14px] font-semibold pr-4" style={{ color: open ? "var(--azul-navy)" : "var(--text-body)" }}>
          {q}
        </span>
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: open ? "var(--azul-navy)" : "var(--bg-card)",
            transition: "background 200ms, transform 200ms",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 1v8M1 5h8" stroke={open ? "#fff" : "var(--text-muted)"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      <div
        ref={bodyRef}
        id={`faq-body-${index}`}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" };
      gsap.from(headRef.current, { opacity: 0, y: 32, duration: 0.8, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(listRef.current!.children, {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out", stagger: 0.07, delay: 0.2,
        scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-6 lg:px-16"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-default)" }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-light leading-tight tracking-tight" style={{ color: "var(--azul-navy)" }}>
              Perguntas{" "}
              <em className="not-italic font-semibold" style={{ color: "var(--azul-yellow)" }}>frequentes.</em>
            </h2>
            <p className="text-sm mt-2 max-w-sm" style={{ color: "var(--text-muted)" }}>
              Não achou o que precisava? A gente responde em menos de 2 min pelo chat.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 text-sm font-semibold px-5 py-2.5 rounded-full"
            style={{
              border: "1.5px solid var(--border-default)",
              color: "var(--text-muted)",
              transition: "border-color 180ms, color 180ms",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--azul-navy)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--azul-navy)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-default)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
          >
            Central de ajuda →
          </a>
        </div>

        {/* FAQ list */}
        <div ref={listRef} className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* Bottom support CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 p-6 rounded-2xl"
          style={{ background: "var(--bg-blue-soft)", border: "1.5px solid #BDD8F0" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--azul-blue)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--azul-navy)" }}>Ainda tem dúvidas?</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Nosso time está online agora. Resposta em até 2 minutos.</p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 text-sm font-bold px-6 py-3 rounded-2xl"
            style={{
              background: "var(--azul-navy)",
              color: "#fff",
              transition: "opacity 150ms",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Falar com suporte
          </button>
        </div>
      </div>
    </section>
  );
}
