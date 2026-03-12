import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";

export function NewsCta() {
  return (
    <section className="section-divider section-space">
      <Container>
        <Panel className="grain-mask overflow-hidden rounded-[2.5rem]" variant="cta" padding="lg">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-eyebrow">
                Seguir leyendo
              </p>
              <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                Volve a novedades o segui el recorrido del grupo en funciones y
                contacto.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                La seccion queda preparada para crecer con prensa, anuncios,
                cobertura de festivales y notas mas largas sin cambiar la
                estructura editorial.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/novedades">Volver a novedades</ButtonLink>
              <ButtonLink href="/funciones" variant="secondary">
                Ver funciones
              </ButtonLink>
            </div>
          </div>
        </Panel>
      </Container>
    </section>
  );
}
