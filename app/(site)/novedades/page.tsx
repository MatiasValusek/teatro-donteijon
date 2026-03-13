import type { Metadata } from "next";
import { FeaturedNewsCard } from "@/components/news/featured-news-card";
import { NewsGrid } from "@/components/news/news-grid";
import { NewsHeader } from "@/components/news/news-header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublishedNews } from "@/lib/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Novedades",
  description:
    "Estrenos, talleres, prensa, festivales y anuncios de Vamos de Nuevo.",
  path: "/novedades",
});

export default async function NovedadesPage() {
  const posts = await getPublishedNews();
  const featuredPost = posts.find((post) => post.featured) ?? posts[0] ?? null;
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost?.slug);
  const hasPosts = posts.length > 0;
  const hasRemainingPosts = remainingPosts.length > 0;

  return (
    <>
      <NewsHeader posts={posts} />

      {featuredPost ? (
        <section className="section-divider section-space">
          <Container>
            <FeaturedNewsCard post={featuredPost} />
          </Container>
        </section>
      ) : null}

      <section className="section-divider section-space">
        <Container>
          {hasRemainingPosts ? (
            <NewsGrid posts={remainingPosts} />
          ) : !hasPosts ? (
            <EmptyState
              title="No hay novedades publicadas en este momento."
              description="Las publicaciones visibles van a aparecer aca apenas queden listas desde el panel."
              action={
                <ButtonLink href="/contacto" variant="secondary" size="md">
                  Contactar al grupo
                </ButtonLink>
              }
            />
          ) : null}
        </Container>
      </section>
    </>
  );
}
