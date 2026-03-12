import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsContent } from "@/components/news/news-content";
import { NewsCta } from "@/components/news/news-cta";
import { NewsHero } from "@/components/news/news-hero";
import { RelatedNews } from "@/components/news/related-news";
import {
  getNewsBySlug,
  getPublishedNews,
  getRelatedNewsPosts,
} from "@/lib/queries";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedNews();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return {
      title: "Novedad no encontrada",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
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
