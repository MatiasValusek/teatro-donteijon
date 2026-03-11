import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { performances, works } from "@/lib/mocks";
import { workStageLabel } from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";

const heroStats = [
  { label: "Obras activas", value: "03" },
  { label: "Fechas cargadas", value: "04" },
  { label: "Temporada", value: "2026" },
];

export function HeroSection() {
  const featuredWork = works.find((work) => work.featured) ?? works[0];
  const nextPerformance = performances[0];

  return (
    <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16 lg:pb-24 lg:pt-24">
      <Container className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            Teatro independiente en movimiento
          </p>
          <h1 className="mt-5 text-[3.2rem] leading-[0.92] text-white sm:text-[4.4rem] lg:text-[5.5rem]">
            Una presencia digital para una escena intensa, móvil y viva.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Vamos de Nuevo arranca con una web pensada primero para celular, con
            una identidad teatral contemporánea, cálida y lista para crecer sin
            volverse institucional.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/funciones">Próximas funciones</ButtonLink>
            <ButtonLink href="/obras" variant="secondary">
              Explorar obras
            </ButtonLink>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-2xl font-semibold text-white sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,135,67,0.32),transparent_65%)] blur-3xl" />
          <div className="grain-mask relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(160deg,rgba(138,30,44,0.2),rgba(10,10,10,0.96))] p-5 sm:p-7">
            <div className="rounded-[1.8rem] border border-white/10 bg-black/30 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/80">
                En foco
              </p>
              <h2 className="mt-3 text-3xl leading-none text-white sm:text-4xl">
                {featuredWork.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {featuredWork.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted">
                  {workStageLabel[featuredWork.stage]}
                </span>
                {featuredWork.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[0.9fr,1.1fr]">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/80">
                  Próxima fecha
                </p>
                <p className="mt-3 text-xl text-white">
                  {formatLongDate(nextPerformance.date)}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {nextPerformance.venue} · {nextPerformance.city}
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.28em] text-orange-100">
                  {nextPerformance.time}
                </p>
              </div>

              <blockquote className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(244,92,44,0.14),rgba(18,18,18,0.9))] p-5">
                <p className="text-2xl leading-tight text-white sm:text-[2rem]">
                  “Cada obra busca encender una conversación antes, durante y
                  después del aplauso.”
                </p>
                <footer className="mt-4 text-xs uppercase tracking-[0.32em] text-orange-200/75">
                  Manifiesto VdN
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
