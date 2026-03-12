import { NewsGrid } from "@/components/news/news-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import { getRecentNewsPosts } from "@/lib/catalog";

export function NewsPreviewSection() {
  const posts = getRecentNewsPosts(3);

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
        <NewsGrid posts={posts} />
      </Container>
    </SectionShell>
  );
}
