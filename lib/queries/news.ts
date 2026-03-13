import { cache } from "react";
import { newsPosts as newsPostsFallback } from "@/data/news";
import { mapNewsPostRowToNewsPost } from "@/lib/queries/mappers";
import {
  type NewsGalleryRow,
  NEWS_GALLERY_COLUMNS,
  PUBLIC_NEWS_POSTS_COLUMNS,
  groupRowsBy,
  logSupabaseQueryError,
  sortNewsForDisplay,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function getPublishedNewsRows() {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("news_posts")
    .select(PUBLIC_NEWS_POSTS_COLUMNS)
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

async function getGalleryMap(postIds: string[]) {
  const client = getSupabaseServerClient();

  if (!client || postIds.length === 0) {
    return new Map<string, NewsGalleryRow[]>();
  }

  const { data, error } = await client
    .from("news_gallery")
    .select(NEWS_GALLERY_COLUMNS)
    .in("news_post_id", postIds)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return groupRowsBy(data ?? [], (row) => row.news_post_id);
}

export const getPublishedNews = cache(async () => {
  try {
    const postRows = await getPublishedNewsRows();

    if (postRows === null) {
      return sortNewsForDisplay(newsPostsFallback);
    }

    const galleryMap = await getGalleryMap(postRows.map((row) => row.id));

    return postRows.map((row) =>
      mapNewsPostRowToNewsPost(row, galleryMap.get(row.id) ?? []),
    );
  } catch (error) {
    logSupabaseQueryError("getPublishedNews", error);
    return sortNewsForDisplay(newsPostsFallback);
  }
});

export const getPublishedNewsSlugs = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return newsPostsFallback.map((post) => post.slug);
  }

  try {
    const { data, error } = await client
      .from("news_posts")
      .select("slug")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      logSupabaseQueryError("getPublishedNewsSlugs", error);
      return newsPostsFallback.map((post) => post.slug);
    }

    return (data ?? []).map((row) => row.slug);
  } catch (error) {
    logSupabaseQueryError("getPublishedNewsSlugs", error);
    return newsPostsFallback.map((post) => post.slug);
  }
});

export const getNewsBySlug = cache(async (slug: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return newsPostsFallback.find((post) => post.slug === slug) ?? null;
  }

  try {
    const { data: row, error } = await client
      .from("news_posts")
      .select(PUBLIC_NEWS_POSTS_COLUMNS)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      logSupabaseQueryError("getNewsBySlug", error);
      return newsPostsFallback.find((post) => post.slug === slug) ?? null;
    }

    if (!row) {
      return null;
    }

    const { data: galleryRows, error: galleryError } = await client
      .from("news_gallery")
      .select(NEWS_GALLERY_COLUMNS)
      .eq("news_post_id", row.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (galleryError) {
      logSupabaseQueryError("getNewsBySlug:gallery", galleryError);
      return mapNewsPostRowToNewsPost(row, []);
    }

    return mapNewsPostRowToNewsPost(row, galleryRows ?? []);
  } catch (error) {
    logSupabaseQueryError("getNewsBySlug", error);
    return newsPostsFallback.find((post) => post.slug === slug) ?? null;
  }
});

export const getFeaturedNewsPost = cache(async () => {
  const posts = await getPublishedNews();

  return posts.find((post) => post.featured) ?? posts[0] ?? null;
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
