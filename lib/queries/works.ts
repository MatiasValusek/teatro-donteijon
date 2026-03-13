import { cache } from "react";
import { works as worksFallback } from "@/data/works";
import { mapWorkRowToWork } from "@/lib/queries/mappers";
import {
  PUBLIC_WORKS_COLUMNS,
  type WorkGalleryRow,
  WORK_GALLERY_COLUMNS,
  groupRowsBy,
  logSupabaseQueryError,
  sortWorksForDisplay,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function getPublishedWorkRows() {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("works")
    .select(PUBLIC_WORKS_COLUMNS)
    .eq("is_published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

async function getGalleryMap(workIds: string[]) {
  const client = getSupabaseServerClient();

  if (!client || workIds.length === 0) {
    return new Map<string, WorkGalleryRow[]>();
  }

  const { data, error } = await client
    .from("work_gallery")
    .select(WORK_GALLERY_COLUMNS)
    .in("work_id", workIds)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return groupRowsBy(data ?? [], (row) => row.work_id);
}

export const getPublishedWorks = cache(async () => {
  try {
    const workRows = await getPublishedWorkRows();

    if (workRows === null) {
      return sortWorksForDisplay(worksFallback);
    }

    const galleryMap = await getGalleryMap(workRows.map((row) => row.id));

    return workRows.map((row) => mapWorkRowToWork(row, galleryMap.get(row.id) ?? []));
  } catch (error) {
    logSupabaseQueryError("getPublishedWorks", error);
    return sortWorksForDisplay(worksFallback);
  }
});

export const getPublishedWorkSlugs = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return worksFallback.map((work) => work.slug);
  }

  try {
    const { data, error } = await client
      .from("works")
      .select("slug")
      .eq("is_published", true)
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true });

    if (error) {
      logSupabaseQueryError("getPublishedWorkSlugs", error);
      return worksFallback.map((work) => work.slug);
    }

    return (data ?? []).map((row) => row.slug);
  } catch (error) {
    logSupabaseQueryError("getPublishedWorkSlugs", error);
    return worksFallback.map((work) => work.slug);
  }
});

export const getWorkBySlug = cache(async (slug: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return worksFallback.find((work) => work.slug === slug) ?? null;
  }

  try {
    const { data: row, error } = await client
      .from("works")
      .select(PUBLIC_WORKS_COLUMNS)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      logSupabaseQueryError("getWorkBySlug", error);
      return worksFallback.find((work) => work.slug === slug) ?? null;
    }

    if (!row) {
      return null;
    }

    const { data: galleryRows, error: galleryError } = await client
      .from("work_gallery")
      .select(WORK_GALLERY_COLUMNS)
      .eq("work_id", row.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (galleryError) {
      logSupabaseQueryError("getWorkBySlug:gallery", galleryError);
      return mapWorkRowToWork(row, []);
    }

    return mapWorkRowToWork(row, galleryRows ?? []);
  } catch (error) {
    logSupabaseQueryError("getWorkBySlug", error);
    return worksFallback.find((work) => work.slug === slug) ?? null;
  }
});
