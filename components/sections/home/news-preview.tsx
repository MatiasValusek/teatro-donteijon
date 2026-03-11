import { NewsCard } from "@/components/cards/news-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import { newsItems } from "@/lib/mocks";

export function NewsPreviewSection() {
  return (
    <SectionShell
      eyebrow="Novedades"
      title="Noticias cortas para sostener movimiento y conversación."
      description="La sección queda lista para evolucionar hacia artículos completos o integración con CMS cuando haga falta."
      action={
        <ButtonLink href="/novedades" variant="secondary" size="md">
          Ir a novedades
        </ButtonLink>
      }
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {newsItems.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </Container>
    </SectionShell>
  );
}
