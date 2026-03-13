import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { WorkDetails } from "@/components/works/work-details";
import { WorkFunctions } from "@/components/works/work-functions";
import { WorkGallery } from "@/components/works/work-gallery";
import { WorkHero } from "@/components/works/work-hero";
import {
  getFunctionsByWorkId,
  getPublishedWorkSlugs,
  getWorkBySlug,
} from "@/lib/queries";
import {
  buildDescriptionFallback,
  buildPageTitle,
  createNotFoundMetadata,
  createPageMetadata,
} from "@/lib/seo/metadata";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedWorkSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return createNotFoundMetadata(
      "Obra no encontrada",
      "Obras",
      `/obras/${slug}`,
    );
  }

  return createPageMetadata({
    title: buildPageTitle(work.title, "Obras"),
    description: buildDescriptionFallback(
      work.shortDescription,
      work.fullDescription,
    ),
    path: `/obras/${work.slug}`,
    image: work.coverImage,
    imageAlt: work.coverAlt,
  });
}

export default async function ObraDetallePage({
  params,
}: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const relatedEvents = await getFunctionsByWorkId(work.id);

  return (
    <>
      <WorkHero work={work} />
      <WorkDetails work={work} />
      <WorkGallery work={work} />
      <WorkFunctions work={work} events={relatedEvents} />

      <section className="section-divider section-space">
        <Container>
          <Panel variant="cta" padding="lg">
            <div className="grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="section-eyebrow">
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
          </Panel>
        </Container>
      </section>
    </>
  );
}
