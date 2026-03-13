import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { WorksGrid } from "@/components/works/works-grid";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getPublishedWorks } from "@/lib/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Obras",
  description:
    "Repertorio de obras en cartel y archivo reciente de Vamos de Nuevo, con fichas claras para explorar cada montaje.",
  path: "/obras",
});

export default async function ObrasPage() {
  const orderedWorks = await getPublishedWorks();

  return (
    <>
      <PageIntro
        eyebrow="Obras"
        title="Obras en cartel y archivo reciente del grupo."
        description="Un repertorio ordenado para navegar obras publicadas con cards reutilizables, rutas claras y una base consistente entre UI y datos."
      />

      <section className="section-divider section-space">
        <Container>
          {orderedWorks.length > 0 ? (
            <WorksGrid works={orderedWorks} />
          ) : (
            <EmptyState
              title="Todavia no hay obras publicadas."
              description="Cuando el repertorio tenga contenido visible, esta pagina lo va a mostrar automaticamente en el mismo sistema visual."
              action={
                <ButtonLink href="/contacto" variant="secondary" size="md">
                  Contactar al grupo
                </ButtonLink>
              }
            />
          )}
        </Container>
      </section>
    </>
  );
}
