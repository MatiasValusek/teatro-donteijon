import { cache } from "react";
import {
  orderFunctionsWithWorks,
  toArgentinaDateParts,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resolveStorageImageUrl } from "@/lib/supabase/storage";
import type { FunctionEvent, FunctionEventWithWork, Work, WorkStatus } from "@/types/content";

const FUNCTION_COLUMNS =
  "id, work_id, starts_at, venue_name, venue_address, reservation_url, ticket_price_text, is_active";

const FUNCTION_WORK_COLUMNS =
  "id, slug, title, short_description, genre, duration_minutes, status, director, cast, cover_image_url, featured, sort_order, created_at";

type FunctionRow = {
  id: string;
  work_id: string;
  starts_at: string;
  venue_name: string;
  venue_address: string;
  reservation_url: string | null;
  ticket_price_text: string | null;
  is_active: boolean;
};

type FunctionWorkRow = {
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

function mapFunction(row: FunctionRow): FunctionEvent {
  const parts = toArgentinaDateParts(row.starts_at);

  return {
    id: row.id,
    workId: row.work_id,
    date: parts.date,
    time: parts.time,
    venueName: row.venue_name,
    venueAddress: row.venue_address,
    reservationUrl: row.reservation_url,
    ticketPriceText: row.ticket_price_text,
    active: row.is_active,
  };
}

function mapFunctionWork(row: FunctionWorkRow): Work {
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

async function getFunctionWorkMap(workIds: string[]) {
  if (workIds.length === 0) {
    return new Map<string, Work>();
  }

  const client = getSupabaseServerClient();

  if (!client) {
    return new Map<string, Work>();
  }

  const { data, error } = await client
    .from("works")
    .select(FUNCTION_WORK_COLUMNS)
    .in("id", workIds)
    .eq("is_published", true);

  if (error) {
    throw new Error("No se pudo obtener la informacion basica de las obras.");
  }

  return new Map((data ?? []).map((row) => [row.id, mapFunctionWork(row as FunctionWorkRow)]));
}

export const getFunctions = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("functions")
    .select(FUNCTION_COLUMNS)
    .eq("is_active", true)
    .order("starts_at", { ascending: true });

  if (error) {
    throw new Error("No se pudieron obtener las funciones activas.");
  }

  const rows = (data ?? []) as FunctionRow[];
  const workMap = await getFunctionWorkMap([...new Set(rows.map((row) => row.work_id))]);

  return orderFunctionsWithWorks(
    rows.reduce<FunctionEventWithWork[]>((accumulator, row) => {
      const work = workMap.get(row.work_id);

      if (work) {
        accumulator.push({
          event: mapFunction(row),
          work,
        });
      }

      return accumulator;
    }, []),
  );
});

export const getUpcomingFunctions = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("functions")
    .select(FUNCTION_COLUMNS)
    .eq("is_active", true)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  if (error) {
    throw new Error("No se pudieron obtener las proximas funciones.");
  }

  const rows = (data ?? []) as FunctionRow[];
  const workMap = await getFunctionWorkMap([...new Set(rows.map((row) => row.work_id))]);

  return orderFunctionsWithWorks(
    rows.reduce<FunctionEventWithWork[]>((accumulator, row) => {
      const work = workMap.get(row.work_id);

      if (work) {
        accumulator.push({
          event: mapFunction(row),
          work,
        });
      }

      return accumulator;
    }, []),
  );
});

export const getFunctionsByWorkId = cache(async (workId: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("functions")
    .select(FUNCTION_COLUMNS)
    .eq("work_id", workId)
    .eq("is_active", true)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  if (error) {
    throw new Error("No se pudieron obtener las funciones de la obra.");
  }

  return ((data ?? []) as FunctionRow[]).map(mapFunction);
});
