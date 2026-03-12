import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import type { NewsPost } from "@/types/content";
import { NewsGrid } from "./news-grid";

type RelatedNewsProps = {
  posts: NewsPost[];
};

export function RelatedNews({ posts }: RelatedNewsProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <SectionShell
      eyebrow="Relacionadas"
      title="Otras novedades para seguir el movimiento del grupo."
      description="Una seleccion de publicaciones recientes o cercanas por tema para sostener lectura y navegacion dentro de la seccion."
      action={
        <ButtonLink href="/novedades" variant="secondary" size="md">
          Ver todas
        </ButtonLink>
      }
    >
      <Container>
        <NewsGrid posts={posts} />
      </Container>
    </SectionShell>
  );
}
