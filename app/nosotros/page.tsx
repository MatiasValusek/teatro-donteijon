import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { companyHighlights, companyValues, siteStatement } from "@/lib/mocks";

export default function NosotrosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Nosotros"
        title="Una compañía que trabaja la escena como encuentro."
        description="Vamos de Nuevo desarrolla teatro independiente con procesos abiertos, dirección colectiva y una puesta visual pensada para quedar resonando después de la función."
        actions={
          <>
            <ButtonLink href="/funciones">Ver próximas funciones</ButtonLink>
            <ButtonLink href="/contacto" variant="secondary">
              Contactar al grupo
            </ButtonLink>
          </>
        }
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            {siteStatement.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-4">
            {companyHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(12,12,12,0.94))] p-5"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-divider py-16 sm:py-20">
        <Container>
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(138,30,44,0.24),rgba(15,15,15,0.94))] p-6 sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
                Cómo trabajamos
              </p>
              <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
                Ensayo, revisión y cuerpo vivo como método.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {companyValues.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-orange-200/70">
                    {item.kicker}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
