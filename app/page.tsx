import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { Modules } from "@/components/landing/Modules";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ClosingCTA } from "@/components/landing/ClosingCTA";
import { SurveyStrip } from "@/components/landing/SurveyStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Modules />
      <Testimonials />
      <FAQ />
      <ClosingCTA />
      <SurveyStrip />
    </>
  );
}
