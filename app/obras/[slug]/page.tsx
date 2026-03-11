import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { performances, works } from "@/lib/mocks";
import { toneStyles, workStageLabel } from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);

  if (!work) {
    return {
      title: "Obra no encontrada",
    };
  }

  return {
    title: work.title,
    description: work.summary,
  };
}

export default async function ObraDetallePage({
  params,
}: WorkDetailPageProps) {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);

  if (!work) {
    notFound();
  }

  const workPerformances = performances.filter(
    (performance) => performance.workSlug === work.slug,
  );
  const tone = toneStyles[work.tone];

  return (
    <>
      <PageIntro
        eyebrow="Detalle de obra"
        title={work.title}
        description={work.summary}
        actions={
          <>
            <ButtonLink href="/funciones">Ver agenda</ButtonLink>
            <ButtonLink href="/contacto" variant="secondary">
              Pedir información
            </ButtonLink>
          </>
        }
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
          <article
            className={`grain-mask overflow-hidden rounded-[2rem] border p-6 sm:p-8 ${tone.surface}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${tone.chip}`}
              >
                {workStageLabel[work.stage]}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted">
                {work.durationMinutes} min
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted">
                {work.premiereSeason}
              </span>
            </div>

            <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
              {work.description}
            </p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <dt className="text-xs uppercase tracking-[0.3em] text-orange-200/75">
                  Dirección
                </dt>
                <dd className="mt-3 text-lg text-white">{work.direction}</dd>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <dt className="text-xs uppercase tracking-[0.3em] text-orange-200/75">
                  Elenco
                </dt>
                <dd className="mt-3 text-lg text-white">
                  {work.cast.join(", ")}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className="grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
                Próximas fechas
              </p>
              {workPerformances.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {workPerformances.map((performance) => (
                    <article
                      key={performance.id}
                      className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4"
                    >
                      <p className="text-sm uppercase tracking-[0.28em] text-muted">
                        {formatLongDate(performance.date)}
                      </p>
                      <h2 className="mt-2 text-xl text-white">
                        {performance.venue}
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        {performance.city} · {performance.time}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm leading-7 text-muted">
                  No hay fechas publicadas todavía. La sección ya está lista para
                  conectarse a Supabase cuando definamos calendario real.
                </p>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(244,92,44,0.15),rgba(18,18,18,0.95))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
                Próximo paso
              </p>
              <h2 className="mt-3 text-3xl leading-none text-white">
                Ficha lista para sumar prensa, galería y reservas.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                La ruta dinámica ya queda armada con `generateStaticParams`,
                metadata por obra y estructura reutilizable para contenido real.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
