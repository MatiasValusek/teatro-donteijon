import { cache } from "react";
import { works as worksFallback } from "@/data/works";
import { mapWorkRowToWork } from "@/lib/queries/mappers";
import {
  WORK_GALLERY_COLUMNS,
  WORKS_COLUMNS,
  groupRowsBy,
  hasRows,
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
    .select(WORKS_COLUMNS)
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
    return new Map<string, Array<{ id: string; work_id: string; image_url: string; alt_text: string; sort_order: number; created_at: string }>>();
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

    if (!hasRows(workRows)) {
      return sortWorksForDisplay(worksFallback);
    }

    const galleryMap = await getGalleryMap(workRows.map((row) => row.id));

    return workRows.map((row) => mapWorkRowToWork(row, galleryMap.get(row.id) ?? []));
  } catch (error) {
    logSupabaseQueryError("getPublishedWorks", error);
    return sortWorksForDisplay(worksFallback);
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
      .select(WORKS_COLUMNS)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !row) {
      if (error) {
        logSupabaseQueryError("getWorkBySlug", error);
      }

      return worksFallback.find((work) => work.slug === slug) ?? null;
    }

    const { data: galleryRows, error: galleryError } = await client
      .from("work_gallery")
      .select(WORK_GALLERY_COLUMNS)
      .eq("work_id", row.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (galleryError) {
      logSupabaseQueryError("getWorkBySlug:gallery", galleryError);
      return worksFallback.find((work) => work.slug === slug) ?? null;
    }

    return mapWorkRowToWork(row, galleryRows ?? []);
  } catch (error) {
    logSupabaseQueryError("getWorkBySlug", error);
    return worksFallback.find((work) => work.slug === slug) ?? null;
  }
});
