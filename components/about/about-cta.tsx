import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";

type AboutCtaProps = {
  contactEmail: string;
  instagramUrl: string;
};

export function AboutCta({ contactEmail, instagramUrl }: AboutCtaProps) {
  return (
    <section className="section-divider section-space">
      <Container>
        <Panel className="grain-mask overflow-hidden rounded-[2.5rem]" variant="cta" padding="lg">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-eyebrow">
                Seguir la obra viva
              </p>
              <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                La historia del grupo sigue en cada obra, funcion y nuevo
                encuentro.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                Si queres seguir explorando el universo de VdN, podes pasar por
                las obras, revisar la agenda o escribirnos para programacion,
                alianzas y conversaciones futuras.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/obras">Conoce nuestras obras</ButtonLink>
              <ButtonLink href="/funciones" variant="secondary">
                Ver proximas funciones
              </ButtonLink>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex min-h-11 w-fit items-center rounded-full border border-white/10 px-4 py-2 text-white hover:bg-white/5 focus-visible:outline-none"
            >
              {contactEmail}
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-fit items-center rounded-full border border-white/10 px-4 py-2 text-white hover:bg-white/5 focus-visible:outline-none"
            >
              Seguir en Instagram
            </a>
          </div>
        </Panel>
      </Container>
    </section>
  );
}
