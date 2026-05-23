"use client";

import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloneAirplaneMaterials } from "../utils/cloneAirplaneMaterials";

gsap.registerPlugin(ScrollTrigger);

function Airplane() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/a320.glb");

  const cloned = useMemo(() => cloneAirplaneMaterials(scene), [scene]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;

    const state = {
      px: 8,
      py: 0,
      pz: 0,
      sx: 0.4,
      sy: 0.4,
      sz: 0.4,
      ry: -20 * (Math.PI / 180),
      rx: 0.05,
      rz: 0,
    };

    const apply = () => {
      group.position.set(state.px, state.py, state.pz);
      group.scale.set(state.sx, state.sy, state.sz);
      group.rotation.x = state.rx;
      group.rotation.y = state.ry;
      group.rotation.z = state.rz;
    };

    apply();

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 2.5,
        invalidateOnRefresh: true,
      },
    });

    tl1.to(state, {
      px: 0,
      py: 0,
      pz: 38,
      sx: 2.5,
      sy: 2.5,
      sz: 2.5,
      ry: 0,
      rx: 0,
      rz: 0,
      ease: "sine.inOut",
      duration: 1,
      onUpdate: apply,
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-space",
        start: "top top",
        end: "bottom top",
        scrub: 2,
        invalidateOnRefresh: true,
      },
    });

    tl2.to(state, {
      rz: 0.32,
      ry: -Math.PI * 0.12,
      rx: 0.06,
      ease: "power1.inOut",
      duration: 0.35,
      onUpdate: apply,
    });

    tl2.to(state, {
      px: -65,
      py: -3,
      pz: 28,
      sx: 1.6,
      sy: 1.6,
      sz: 1.6,
      ry: -Math.PI * 0.30,
      rx: 0.10,
      rz: 0.28,
      ease: "power2.in",
      duration: 0.65,
      onUpdate: apply,
    });

    ScrollTrigger.refresh();

    return () => {
      tl1.scrollTrigger?.kill();
      tl1.kill();
      tl2.scrollTrigger?.kill();
      tl2.kill();
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

export default function AirplaneCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    gsap.to(wrapperRef.current, {
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#next-section",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 50], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} castShadow />
        <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#2D7BC4" />
        <pointLight position={[0, 4, 2]} intensity={0.6} color="#ffffff" />

        <Airplane />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
