import type { Metadata } from "next";
import { FeaturedNewsCard } from "@/components/news/featured-news-card";
import { NewsGrid } from "@/components/news/news-grid";
import { NewsHeader } from "@/components/news/news-header";
import { Container } from "@/components/ui/container";
import { getFeaturedNewsPost, getPublishedNews } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Novedades",
  description:
    "Estrenos, talleres, prensa, festivales y anuncios de Vamos de Nuevo.",
};

export default async function NovedadesPage() {
  const [posts, featuredPost] = await Promise.all([
    getPublishedNews(),
    getFeaturedNewsPost(),
  ]);
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

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
          <NewsGrid posts={remainingPosts} />
        </Container>
      </section>
    </>
  );
}
