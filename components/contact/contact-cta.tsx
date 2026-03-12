import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";

export function ContactCta() {
  return (
    <section className="section-divider section-space">
      <Container>
        <Panel className="grain-mask overflow-hidden rounded-[2.5rem]" variant="cta" padding="lg">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-eyebrow">
                Seguir recorriendo
              </p>
              <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                La conversacion puede seguir en funciones, obras y proximos
                procesos del grupo.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                El cierre de la experiencia publica queda conectado con la
                agenda, el repertorio y las proximas novedades del sitio.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/funciones">Ver funciones</ButtonLink>
              <ButtonLink href="/obras" variant="secondary">
                Conocer nuestras obras
              </ButtonLink>
            </div>
          </div>
        </Panel>
      </Container>
    </section>
  );
}
