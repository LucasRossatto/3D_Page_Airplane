import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import NextSection from "@/components/NextSection";
import MilesProgram from "@/components/MilesProgram";
import DestinationsSection from "@/components/DestinationsSection";
import FlashDeals from "@/components/FlashDeals";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import NewsletterAlert from "@/components/NewsletterAlert";
import Footer from "@/components/Footer";

const AirplaneCanvas = dynamic(() => import("../components/3dAirplane"));
const AirplaneCrossCanvas = dynamic(
  () => import("../components/AirplaneCross"),
);

export default function Home() {
  return (
    <>
      {/* Canvas fixo z:1 — fases 1 e 2 */}
      <AirplaneCanvas />

      {/* z:2 — hero transparente */}
      <Hero />

      {/* Fase 2 — fly-past */}
      <div
        id="scroll-space"
        className="bg-fixed-desktop hidden md:block"
        style={{
          height: "60vh",
          backgroundImage: "url('/assets/bg-hero-pouso.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.55) 40%, transparent 100%)",
          }}
        />
      </div>

      {/* z:3 — next section */}
      <NextSection />

      {/* Fase 3 — canvas próprio, sticky, avião cruza da direita para esquerda */}
      <div
        id="cross-space"
        style={{
          height: "300vh",
          position: "relative",
          zIndex: 2,
          background: "#0B2E5E",
        }}
      >
        <AirplaneCrossCanvas />
      </div>

      <div className="relative z-10">
        <MilesProgram />
      </div>

      <DestinationsSection />

      <FlashDeals />

      <HowItWorks />

      <FAQ />

      <NewsletterAlert />

      <Footer />
    </>
  );
}
