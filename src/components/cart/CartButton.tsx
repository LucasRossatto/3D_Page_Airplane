"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { count, openCart } = useCart();
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(0);

  useEffect(() => {
    if (count > prevCount.current && badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 1.6 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1.2, 0.5)" },
      );
    }
    prevCount.current = count;
  }, [count]);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Carrinho — ${count} destino${count !== 1 ? "s" : ""}`}
      className=" fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full shadow-xl"
      style={{
        background: "var(--azul-yellow)",
        boxShadow: "0 8px 32px rgba(11,46,94,0.4)",
        transition: "transform 200ms, box-shadow 200ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 14px 40px rgba(11,46,94,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(11,46,94,0.4)";
      }}
    >
      {/* cart icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      <span className="text-[13px] font-bold text-white">
        {count === 0
          ? "Minha viagem"
          : count === 1
            ? "1 destino"
            : `${count} destinos`}
      </span>

      {count > 0 && (
        <span
          ref={badgeRef}
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
          style={{
            background: "var(--azul-yellow)",
            color: "var(--azul-navy)",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
