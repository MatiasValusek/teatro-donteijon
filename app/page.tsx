import { CompanyPreviewSection } from "@/components/sections/home/company-preview";
import { FinalCtaSection } from "@/components/sections/home/final-cta";
import { HeroSection } from "@/components/sections/home/hero-section";
import { NewsPreviewSection } from "@/components/sections/home/news-preview";
import { PerformancePreviewSection } from "@/components/sections/home/performance-preview";
import { WorkPreviewSection } from "@/components/sections/home/work-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CompanyPreviewSection />
      <PerformancePreviewSection />
      <WorkPreviewSection />
      <NewsPreviewSection />
      <FinalCtaSection />
    </>
  );
}
