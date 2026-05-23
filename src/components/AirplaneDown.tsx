"use client";

import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloneAirplaneMaterials } from "../utils/cloneAirplaneMaterials";

gsap.registerPlugin(ScrollTrigger);

/* ── Modelo 3D ─────────────────────────────────────────────────────────── */
function AirplaneDown() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/a320.glb");

  const cloned = useMemo(() => cloneAirplaneMaterials(scene), [scene]);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    /* orientação: avião em pé, nariz apontando para cima */
    const state = {
      py:  21,
      px:  0,
      pz:  26,
      rx:  Math.PI / 2,  /* costas do avião voltadas para cima */
      ry:  0,
      rz:  0.0,
      sx:  1.1,
      sy:  1.1,
      sz:  1.1,
    };

    const apply = () => {
      group.position.set(state.px, state.py, state.pz);
      group.rotation.set(state.rx, state.ry, state.rz);
      group.scale.set(state.sx, state.sy, state.sz);
    };
    apply();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#how-it-works",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    tl.to(state, {
      py: -21,
      ease: "none",
      duration: 1,
      onUpdate: apply,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
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

/* ── Canvas exportado ──────────────────────────────────────────────────── */
export default function AirplaneDownCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 6]}  intensity={2.2} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.7} color="#2D7BC4" />
      <pointLight       position={[0, 4, 4]}   intensity={0.5} color="#ffffff" />

      <AirplaneDown />

      <Environment preset="city" />
    </Canvas>
  );
}
