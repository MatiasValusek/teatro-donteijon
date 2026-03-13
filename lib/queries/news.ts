import { cache } from "react";
import {
  toArgentinaDateParts,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resolveStorageImageUrl } from "@/lib/supabase/storage";
import type { NewsCategory, NewsPost } from "@/types/content";

const NEWS_LIST_COLUMNS =
  "id, slug, title, excerpt, cover_image_url, category, featured, published_at, created_at";

const NEWS_DETAIL_COLUMNS =
  "id, slug, title, excerpt, content, cover_image_url, category, featured, published_at, created_at";

type NewsListRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string;
  category: NewsCategory;
  featured: boolean;
  published_at: string | null;
  created_at: string;
};

type NewsDetailRow = NewsListRow & {
  content: string;
};

function mapNewsListRow(row: NewsListRow): NewsPost {
  const publishedAt = row.published_at ?? row.created_at;
  const parts = toArgentinaDateParts(publishedAt);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.excerpt,
    coverImage: resolveStorageImageUrl(row.cover_image_url),
    coverAlt: row.title,
    gallery: [],
    category: row.category,
    publishedAt: parts.date,
    featured: row.featured,
  };
}

function mapNewsDetailRow(row: NewsDetailRow): NewsPost {
  return {
    ...mapNewsListRow(row),
    content: row.content,
  };
}

export const getPublishedNews = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("news_posts")
    .select(NEWS_LIST_COLUMNS)
    .eq("is_published", true)
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error("No se pudieron obtener las novedades publicadas.");
  }

  return (data ?? []).map((row) => mapNewsListRow(row as NewsListRow));
});

export const getPublishedNewsSlugs = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("news_posts")
    .select("slug")
    .eq("is_published", true)
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error("No se pudieron obtener los slugs de novedades publicadas.");
  }

  return (data ?? []).map((row) => row.slug);
});

export const getNewsBySlug = cache(async (slug: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("news_posts")
    .select(NEWS_DETAIL_COLUMNS)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error("No se pudo obtener la novedad solicitada.");
  }

  if (!data) {
    return null;
  }

  return mapNewsDetailRow(data as NewsDetailRow);
});

export const getFeaturedNews = cache(async () => {
  const posts = await getPublishedNews();

  return posts.filter((post) => post.featured);
});

export const getFeaturedNewsPost = cache(async () => {
  const posts = await getFeaturedNews();

  return posts[0] ?? (await getPublishedNews())[0] ?? null;
});

export const getRelatedNewsPosts = cache(async (slug: string, limit = 3) => {
  const currentPost = await getNewsBySlug(slug);

  if (!currentPost) {
    return [];
  }

  const posts = (await getPublishedNews()).filter((post) => post.slug !== slug);
  const sameCategory = posts.filter((post) => post.category === currentPost.category);
  const otherPosts = posts.filter((post) => post.category !== currentPost.category);

  return [...sameCategory, ...otherPosts].slice(0, limit);
});
