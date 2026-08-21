import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhyAssessed } from "@/components/WhyAssessed";
import { StatsStrip } from "@/components/StatsStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { Deliverable } from "@/components/Deliverable";
import { Testimonial } from "@/components/Testimonial";
import { CmmsBridge } from "@/components/CmmsBridge";
import { LeadForm } from "@/components/LeadForm";
import { Privacy } from "@/components/Privacy";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyAssessed />
      <StatsStrip />
      <HowItWorks />
      <Deliverable />
      <Testimonial />
      <CmmsBridge />
      <LeadForm />
      <Privacy />
      <FAQ />
      <FinalCTA />
    </>
  );
}
