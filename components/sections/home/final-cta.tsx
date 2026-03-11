import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function FinalCtaSection() {
  return (
    <section className="section-divider py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grain-mask overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(161,28,33,0.28),rgba(18,18,18,0.96))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/75">
                Cierre de home
              </p>
              <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                Una base fuerte para sumar agenda real, prensa y comunidad.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                El siguiente paso razonable es conectar Supabase, cargar
                contenidos reales y definir la identidad visual final con fotos,
                piezas gráficas y materiales de cada obra.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/contacto">Hablemos del siguiente sprint</ButtonLink>
              <ButtonLink href="/nosotros" variant="secondary">
                Ver identidad del grupo
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
