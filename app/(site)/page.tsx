import type { Metadata } from "next";
import { CompanyPreviewSection } from "@/components/sections/home/company-preview";
import { FinalCtaSection } from "@/components/sections/home/final-cta";
import { HeroSection } from "@/components/sections/home/hero-section";
import { NewsPreviewSection } from "@/components/sections/home/news-preview";
import { PerformancePreviewSection } from "@/components/sections/home/performance-preview";
import { WorkPreviewSection } from "@/components/sections/home/work-preview";
import { getPublishedNews, getPublishedWorks, getUpcomingFunctions } from "@/lib/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Inicio",
  description:
    "Vamos de Nuevo (VdN) es un grupo de teatro independiente con obras, funciones y novedades para seguir de cerca su trabajo escenico.",
  path: "/",
});

export default async function HomePage() {
  const [works, upcomingItems, newsPosts] = await Promise.all([
    getPublishedWorks(),
    getUpcomingFunctions(),
    getPublishedNews(),
  ]);
  const activeWorks = works.filter((work) => work.status === "active");

  return (
    <>
      <HeroSection works={activeWorks} upcomingItems={upcomingItems} />
      <CompanyPreviewSection />
      <PerformancePreviewSection items={upcomingItems.slice(0, 3)} />
      <WorkPreviewSection works={activeWorks.slice(0, 3)} />
      <NewsPreviewSection posts={newsPosts.slice(0, 3)} />
      <FinalCtaSection />
    </>
  );
}
