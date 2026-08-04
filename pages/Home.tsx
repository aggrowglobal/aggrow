import Hero from "../components/home/Hero";
import Problem from "../components/home/Problem";
import HowItWorksSection from "../components/home/HowItWorksSection";
import AITools from "../components/home/AITools";
import PlatformModules from "../components/home/PlatformModules";
import FreightCalculator from "../components/home/FreightCalculator";
import ComplianceTeaser from "../components/home/ComplianceTeaser";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorksSection />
      <AITools />
      <PlatformModules />
      <FreightCalculator />
      <ComplianceTeaser />
      <CTASection />
    </>
  );
}
