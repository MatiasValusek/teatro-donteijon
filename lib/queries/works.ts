import { cache } from "react";
import { groupRowsBy } from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resolveStorageImageUrl } from "@/lib/supabase/storage";
import type { Work, WorkStatus } from "@/types/content";

const WORK_LIST_COLUMNS =
  "id, slug, title, short_description, genre, duration_minutes, status, director, cast, cover_image_url, featured, sort_order, created_at";

const WORK_DETAIL_COLUMNS =
  "id, slug, title, short_description, full_description, genre, duration_minutes, status, director, cast, cover_image_url, featured, sort_order, created_at";

const WORK_GALLERY_BASE_COLUMNS =
  "id, work_id, image_url, alt_text, sort_order, created_at";

type WorkListRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  genre: string;
  duration_minutes: number;
  status: WorkStatus;
  director: string;
  cast: string[];
  cover_image_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
};

type WorkDetailRow = WorkListRow & {
  full_description: string;
};

type WorkGalleryRow = {
  id: string;
  work_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
};

function mapWorkListRow(row: WorkListRow): Work {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    fullDescription: row.short_description,
    coverImage: resolveStorageImageUrl(row.cover_image_url),
    coverAlt: row.title,
    gallery: [],
    genre: row.genre,
    durationMinutes: row.duration_minutes,
    status: row.status,
    director: row.director,
    cast: row.cast,
    featured: row.featured,
    artisticText: undefined,
    technicalSheet: [],
  };
}

function mapWorkDetailRow(
  row: WorkDetailRow,
  galleryRows: WorkGalleryRow[],
): Work {
  return {
    ...mapWorkListRow(row),
    fullDescription: row.full_description,
    gallery: galleryRows.map((image) => ({
      src: resolveStorageImageUrl(image.image_url),
      alt: image.alt_text,
    })),
  };
}

export const getPublishedWorks = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("works")
    .select(WORK_LIST_COLUMNS)
    .eq("is_published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("No se pudieron obtener las obras publicadas.");
  }

  return (data ?? []).map((row) => mapWorkListRow(row as WorkListRow));
});

export const getFeaturedWorks = cache(async () => {
  const works = await getPublishedWorks();

  return works.filter((work) => work.featured);
});

export const getPublishedWorkSlugs = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("works")
    .select("slug")
    .eq("is_published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("No se pudieron obtener los slugs de obras publicadas.");
  }

  return (data ?? []).map((row) => row.slug);
});

export const getWorkBySlug = cache(async (slug: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data: row, error } = await client
    .from("works")
    .select(WORK_DETAIL_COLUMNS)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error("No se pudo obtener la obra solicitada.");
  }

  if (!row) {
    return null;
  }

  const { data: galleryRows, error: galleryError } = await client
    .from("work_gallery")
    .select(WORK_GALLERY_BASE_COLUMNS)
    .eq("work_id", row.id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (galleryError) {
    throw new Error("No se pudo obtener la galeria de la obra.");
  }

  return mapWorkDetailRow(
    row as WorkDetailRow,
    groupRowsBy(galleryRows ?? [], (galleryRow) => galleryRow.work_id).get(row.id) ??
      [],
  );
});
