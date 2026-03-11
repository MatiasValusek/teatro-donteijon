import { NewsCard } from "@/components/cards/news-card";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { newsItems } from "@/lib/mocks";

export default function NovedadesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Novedades"
        title="Noticias del proceso, anuncios y movimiento del grupo."
        description="La sección está pensada para escalar hacia artículos completos o sincronizarse con una tabla de novedades en Supabase sin rehacer la UI."
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {newsItems.map((item) => (
            <div key={item.slug} id={item.slug}>
              <NewsCard item={item} />
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
