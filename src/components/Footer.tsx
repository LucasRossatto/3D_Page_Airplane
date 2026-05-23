"use client";

const NAV_COLS = [
  {
    heading: "Destinos",
    links: ["Europa", "Américas", "Ásia", "África", "Oceania"],
  },
  {
    heading: "Pacotes",
    links: ["Economy", "Business", "Primeira Classe", "Tudo Incluído"],
  },
  {
    heading: "Empresa",
    links: ["Sobre nós", "Como funciona", "Parceiros", "Carreiras", "Imprensa"],
  },
  {
    heading: "Suporte",
    links: ["Central de ajuda", "Fale conosco", "Política de privacidade", "Termos de uso"],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 17v-3.5a2.5 2.5 0 0 1 5 0V17M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--azul-navy)", color: "rgba(255,255,255,0.55)" }}
      aria-label="Rodapé do site"
    >
      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-10 lg:px-20 py-14"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Texto */}
        <div className="flex flex-col gap-2 max-w-lg">
          <h2
            className="text-3xl sm:text-4xl font-light tracking-tight leading-[1.1]"
            style={{ color: "#fff" }}
          >
            Sua próxima viagem <br />
            <em className="not-italic font-semibold" style={{ color: "var(--azul-yellow)" }}>
              começa aqui.
            </em>
          </h2>
          <p className="text-sm leading-relaxed">
            Crie sua conta grátis e garanta até 40% de desconto já na primeira reserva.
          </p>
        </div>

        {/* Botões */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="text-sm font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-80"
            style={{ background: "var(--azul-yellow)", color: "var(--azul-navy)" }}
          >
            Criar conta grátis
          </button>
          <button
            type="button"
            className="text-sm font-medium px-6 py-3 rounded-full transition-opacity hover:opacity-70"
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
          >
            Explorar destinos
          </button>
        </div>
      </div>

      {/* ── Links grid ────────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 px-10 lg:px-20 py-14"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Brand col */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-5">
          {/* Logo */}
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Voala"
              style={{ height: 44, width: "auto", filter: "brightness(0) invert(1)" }}
            />
          </div>

          <p className="text-sm leading-relaxed max-w-xs">
            Reserve passagens e pacotes para mais de 50 destinos. Menos burocracia, mais viagem.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:text-white"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav cols */}
        {NAV_COLS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {col.heading}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-10 lg:px-20 py-6">
        <p className="text-xs">
          © {new Date().getFullYear()} VoaLá. Todos os direitos reservados.
        </p>

        {/* Badges de pagamento */}
        <div className="flex items-center gap-2">
          {["Visa", "Master", "Pix", "Amex"].map((badge) => (
            <span
              key={badge}
              className="text-[10px] font-medium px-2.5 py-1 rounded"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
