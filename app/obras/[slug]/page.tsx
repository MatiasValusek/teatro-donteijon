import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { WorkDetails } from "@/components/works/work-details";
import { WorkFunctions } from "@/components/works/work-functions";
import { WorkGallery } from "@/components/works/work-gallery";
import { WorkHero } from "@/components/works/work-hero";
import { getFunctionsByWorkId, getWorkBySlug, getWorks } from "@/lib/catalog";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getWorks().map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return {
      title: "Obra no encontrada",
    };
  }

  return {
    title: work.title,
    description: work.shortDescription,
  };
}

export default async function ObraDetallePage({
  params,
}: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const relatedEvents = getFunctionsByWorkId(work.id);

  return (
    <>
      <WorkHero work={work} />
      <WorkDetails work={work} />
      <WorkGallery work={work} />
      <WorkFunctions work={work} events={relatedEvents} />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(161,28,33,0.22),rgba(12,12,12,0.96))] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
                  Cierre
                </p>
                <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
                  Una ficha lista para crecer con prensa, dossier y reservas reales.
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink href="/obras" variant="secondary">
                  Volver a obras
                </ButtonLink>
                <ButtonLink href="/funciones">Ver funciones generales</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
