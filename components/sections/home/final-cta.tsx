import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";

export function FinalCtaSection() {
  return (
    <section className="section-divider section-space">
      <Container>
        <Panel
          className="grain-mask overflow-hidden rounded-[2.5rem]"
          variant="cta"
          padding="lg"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-eyebrow">Cierre de home</p>
              <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                Una base firme para seguir sumando agenda, prensa y comunidad.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                El sitio ya integra frontend publico, panel admin y Supabase.
                Desde aca puede crecer con reservas, imagenes y nuevas capas
                editoriales sin rehacer la base.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/contacto">Contactar al grupo</ButtonLink>
              <ButtonLink href="/nosotros" variant="secondary">
                Ver identidad del grupo
              </ButtonLink>
            </div>
          </div>
        </Panel>
      </Container>
    </section>
  );
}
