import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { siteConfig } from "@/lib/site";
import { workStatusLabel } from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";
import type { FunctionEventWithWork, Work } from "@/types/content";

type HeroSectionProps = {
  works: Work[];
  upcomingItems: FunctionEventWithWork[];
};

export function HeroSection({ works, upcomingItems }: HeroSectionProps) {
  const featuredWork =
    works.find((work) => work.featured) ?? works[0] ?? upcomingItems[0]?.work;
  const nextItem = upcomingItems[0];
  const heroStats = [
    { label: "Obras activas", value: String(works.length).padStart(2, "0") },
    {
      label: "Funciones abiertas",
      value: String(upcomingItems.length).padStart(2, "0"),
    },
    { label: "Temporada", value: String(new Date().getFullYear()) },
  ];

  return (
    <section className="relative overflow-hidden page-hero-space">
      <Container className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="section-eyebrow">
            Teatro independiente en movimiento
          </p>
          <h1 className="mt-5 text-balance text-[3rem] leading-[0.92] text-white sm:text-[4.4rem] lg:text-[5.5rem]">
            Una presencia digital para una escena intensa, movil y viva.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            {siteConfig.name} sostiene una web pensada primero para celular, con
            una identidad teatral contemporanea, calida y una base tecnica lista
            para crecer sin perder claridad.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/funciones">Proximas funciones</ButtonLink>
            <ButtonLink href="/obras" variant="secondary">
              Explorar obras
            </ButtonLink>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {heroStats.map((item, index) => (
              <Panel
                key={item.label}
                className={
                  index === heroStats.length - 1
                    ? "rounded-[1.5rem] px-4 py-4 max-sm:col-span-2"
                    : "rounded-[1.5rem] px-4 py-4"
                }
                padding="none"
              >
                <p className="text-2xl font-semibold text-white sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
                  {item.label}
                </p>
              </Panel>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,135,67,0.32),transparent_65%)] blur-3xl" />
          <Panel className="grain-mask relative overflow-hidden rounded-[2.4rem] p-5 sm:p-7" variant="warm">
            <Panel className="rounded-[1.8rem]" variant="inset">
              <p className="section-eyebrow">
                En foco
              </p>
              {featuredWork ? (
                <>
                  <h2 className="mt-3 text-balance text-3xl leading-none text-white sm:text-4xl">
                    {featuredWork.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {featuredWork.shortDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge>{featuredWork.genre}</Badge>
                    <Badge>{featuredWork.durationMinutes} min</Badge>
                    <Badge>{workStatusLabel[featuredWork.status]}</Badge>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mt-3 text-balance text-3xl leading-none text-white sm:text-4xl">
                    Catalogo en actualizacion
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    La home ya esta preparada para mostrar repertorio y agenda en
                    cuanto haya contenido publico disponible.
                  </p>
                </>
              )}
            </Panel>

            <div className="mt-4 grid gap-4 sm:grid-cols-[0.9fr,1.1fr]">
              <Panel className="rounded-[1.8rem]" variant="soft">
                <p className="section-eyebrow">
                  Proxima fecha
                </p>
                {nextItem ? (
                  <>
                    <p className="mt-3 text-xl text-white">
                      {formatLongDate(nextItem.event.date)}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {nextItem.event.venueName}
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.28em] text-orange-100">
                      {nextItem.event.time} hs
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-3 text-xl text-white">
                      Agenda en actualizacion
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Las proximas fechas apareceran automaticamente cuando haya
                      funciones activas publicadas.
                    </p>
                  </>
                )}
              </Panel>

              <blockquote className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(244,92,44,0.14),rgba(18,18,18,0.9))] p-5">
                <p className="text-2xl leading-tight text-white sm:text-[2rem]">
                  Cada obra busca encender una conversacion antes, durante y
                  despues del aplauso.
                </p>
                <footer className="mt-4 text-xs uppercase tracking-[0.32em] text-orange-200/75">
                  Manifiesto VdN
                </footer>
              </blockquote>
            </div>
          </Panel>
        </div>
      </Container>
    </section>
  );
}
