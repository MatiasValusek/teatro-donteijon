import { NewsGrid } from "@/components/news/news-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionShell } from "@/components/ui/section-shell";
import type { NewsPost } from "@/types/content";

type NewsPreviewSectionProps = {
  posts: NewsPost[];
};

export function NewsPreviewSection({ posts }: NewsPreviewSectionProps) {
  return (
    <SectionShell
      eyebrow="Novedades"
      title="Noticias, estrenos y movimientos para sostener conversacion."
      description="La home toma las publicaciones mas recientes y las presenta con la misma estructura editorial que usara la seccion completa."
      action={
        <ButtonLink href="/novedades" variant="secondary" size="md">
          Ir a novedades
        </ButtonLink>
      }
    >
      <Container>
        {posts.length > 0 ? (
          <NewsGrid posts={posts} />
        ) : (
          <EmptyState
            title="Todavia no hay novedades publicadas."
            description="La seccion editorial ya esta preparada para mostrar estrenos, anuncios y prensa apenas haya contenido visible."
            action={
              <ButtonLink href="/contacto" variant="secondary" size="md">
                Contactar al grupo
              </ButtonLink>
            }
          />
        )}
      </Container>
    </SectionShell>
  );
}
