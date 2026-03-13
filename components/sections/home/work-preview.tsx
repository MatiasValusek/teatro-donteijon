import { WorkCard } from "@/components/works/work-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionShell } from "@/components/ui/section-shell";
import type { Work } from "@/types/content";

type WorkPreviewSectionProps = {
  works: Work[];
};

export function WorkPreviewSection({ works }: WorkPreviewSectionProps) {
  return (
    <SectionShell
      eyebrow="Obras"
      title="Piezas pensadas como fichas visuales, no como listados frios."
      description="La seccion reutiliza cards, rutas por slug y metadatos consistentes para sostener un catalogo claro tambien en mobile."
      action={
        <ButtonLink href="/obras" variant="secondary" size="md">
          Entrar a obras
        </ButtonLink>
      }
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {works.length > 0 ? (
          works.map((work) => <WorkCard key={work.id} work={work} />)
        ) : (
          <div className="md:col-span-2 xl:col-span-3">
            <EmptyState
              title="Todavia no hay obras publicadas."
              description="Cuando el repertorio tenga contenido visible, esta seccion lo va a reflejar sin cambiar la estructura de la home."
              action={
                <ButtonLink href="/contacto" variant="secondary" size="md">
                  Contactar al grupo
                </ButtonLink>
              }
            />
          </div>
        )}
      </Container>
    </SectionShell>
  );
}
