import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsContent } from "@/components/news/news-content";
import { NewsCta } from "@/components/news/news-cta";
import { NewsHero } from "@/components/news/news-hero";
import { RelatedNews } from "@/components/news/related-news";
import {
  getNewsBySlug,
  getPublishedNewsSlugs,
  getRelatedNewsPosts,
} from "@/lib/queries";
import {
  buildDescriptionFallback,
  buildPageTitle,
  createNotFoundMetadata,
  createPageMetadata,
} from "@/lib/seo/metadata";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedNewsSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return createNotFoundMetadata(
      "Novedad no encontrada",
      "Novedades",
      `/novedades/${slug}`,
    );
  }

  return createPageMetadata({
    title: buildPageTitle(post.title, "Novedades"),
    description: buildDescriptionFallback(post.excerpt, post.content),
    path: `/novedades/${post.slug}`,
    image: post.coverImage,
    imageAlt: post.coverAlt,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function NovedadDetallePage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedNewsPosts(post.slug, 3);

  return (
    <>
      <NewsHero post={post} />
      <NewsContent post={post} />
      <RelatedNews posts={relatedPosts} />
      <NewsCta />
    </>
  );
}
