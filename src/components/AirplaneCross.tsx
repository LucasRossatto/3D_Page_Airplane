"use client";

import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloneAirplaneMaterials } from "../utils/cloneAirplaneMaterials";

gsap.registerPlugin(ScrollTrigger);

const TEXTS = [
  { id: "t1", label: "Novas Rotas",     sub: "Mais de 50 destinos adicionados nesta temporada", side: "left"  },
  { id: "t2", label: "Milhas Extra",   sub: "Acumule pontos em cada voo",                    side: "right" },
  { id: "t3", label: "Voe Mais Longe", sub: "Voos diretos para 6 continentes",               side: "left"  },
];

function AirplaneCross() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/a320.glb");

  const cloned = useMemo(() => cloneAirplaneMaterials(scene), [scene]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;

    const isMd = window.innerWidth >= 768;
    const state = {
      px: isMd ? -70 : -48,
      py:   1,
      pz:  22,
      sx:  1.2,
      sy:  1.2,
      sz:  1.2,
      ry:  Math.PI * 0.46,
      rx:  0.04,
      rz: -0.18,
    };

    const apply = () => {
      group.position.set(state.px, state.py, state.pz);
      group.scale.set(state.sx, state.sy, state.sz);
      group.rotation.set(state.rx, state.ry, state.rz);
    };

    apply();

    const trigger = {
      trigger: "#cross-space",
      start: "top top",
      end: "bottom top",
      scrub: 3.5,
      invalidateOnRefresh: true,
    };

    const tl = gsap.timeline({ scrollTrigger: trigger });

    tl.to(state, {
      px:  -6,
      py:   0,
      pz:  24,
      sx:  1.3,
      sy:  1.3,
      sz:  1.3,
      ry:  Math.PI * 0.50,
      rx:   0.02,
      rz:  -0.10,
      ease: "power1.out",
      duration: 0.30,
      onUpdate: apply,
    });

    tl.to(state, {
      px:  10,
      py:   0,
      pz:  24,
      ry:  Math.PI * 0.50,
      rx:   0.0,
      rz:  -0.10,
      ease: "none",
      duration: 0.40,
      onUpdate: apply,
    });

    tl.to(state, {
      px:  50,
      py:  -1,
      pz:  20,
      sx:  1.1,
      sy:  1.1,
      sz:  1.1,
      ry:  Math.PI * 0.54,
      rx:   0.06,
      rz:  -0.26,
      ease: "power2.in",
      duration: 0.30,
      onUpdate: apply,
    });

    const textWindows = [
      { id: "#t1", showAt: 0.10, hideAt: 0.38 },
      { id: "#t2", showAt: 0.38, hideAt: 0.65 },
      { id: "#t3", showAt: 0.65, hideAt: 0.92 },
    ];

    const textTriggers: ScrollTrigger[] = [];

    textWindows.forEach(({ id, showAt, hideAt }) => {
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;

      gsap.set(el, { opacity: 0, y: 30 });

      const stIn = ScrollTrigger.create({
        trigger: "#cross-space",
        start: `top+=${showAt * 100}% top`,
        end:   `top+=${(showAt + 0.08) * 100}% top`,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(el, { opacity: self.progress, y: 30 * (1 - self.progress) });
        },
        invalidateOnRefresh: true,
      });

      const stOut = ScrollTrigger.create({
        trigger: "#cross-space",
        start: `top+=${(hideAt - 0.06) * 100}% top`,
        end:   `top+=${hideAt * 100}% top`,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(el, { opacity: 1 - self.progress, y: -20 * self.progress });
        },
        invalidateOnRefresh: true,
      });

      textTriggers.push(stIn, stOut);
    });

    ScrollTrigger.refresh();

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      textTriggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}

useGLTF.preload("/a320.glb");

export default function AirplaneCrossCanvas() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 2,
        marginBottom: "-100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Textos ─────────────────────────── */}
      {TEXTS.map(({ id, label, sub, side }) => (
        <div
          key={id}
          id={id}
          className="airplane-text"
          style={{
            ...(side === "left"
              ? { left: "clamp(24px, 6vw, 80px)" }
              : { right: "clamp(24px, 6vw, 80px)" }),
          }}
        >
          <p style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.05, color: "#ffffff", margin: 0 }}>
            {label}
          </p>
          <p style={{ fontSize: "clamp(0.75rem, 1.2vw, 1rem)", color: "rgba(255,255,255,0.5)", marginTop: "6px", fontWeight: 400 }}>
            {sub}
          </p>
        </div>
      ))}

      {/* ── Canvas do avião ────────────────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          height: "45vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 50], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
          onCreated={() => {
            const warn = console.warn.bind(console);
            console.warn = (...args: unknown[]) => {
              if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
              warn(...args);
            };
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={2.0} castShadow />
          <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#2D7BC4" />
          <pointLight position={[0, 4, 2]} intensity={0.6} color="#ffffff" />

          <AirplaneCross />

          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
}
