import { cache } from "react";
import { functionEvents as functionsFallback } from "@/data/functions";
import { works as worksFallback } from "@/data/works";
import { mapFunctionRowToFunctionEvent } from "@/lib/queries/mappers";
import {
  formatArgentinaDateTimeLabel,
  logSupabaseQueryError,
  PUBLIC_FUNCTIONS_COLUMNS,
  toArgentinaDateParts,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ReservationFunctionSummary } from "@/types/inbox";

function mapFallbackReservationFunction(id: string): ReservationFunctionSummary | null {
  const event = functionsFallback.find((item) => item.id === id && item.active);

  if (!event) {
    return null;
  }

  const work = worksFallback.find((item) => item.id === event.workId);

  if (!work) {
    return null;
  }

  return {
    id: event.id,
    workId: work.id,
    workTitle: work.title,
    workSlug: work.slug,
    date: event.date,
    time: event.time,
    startsAtLabel: `${event.date} - ${event.time}`,
    venueName: event.venueName,
    venueAddress: event.venueAddress,
    reservationUrl: event.reservationUrl,
    ticketPriceText: event.ticketPriceText ?? null,
  };
}

export const getReservationFunctionById = cache(async (id: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return mapFallbackReservationFunction(id);
  }

  try {
    const { data: functionRow, error: functionError } = await client
      .from("functions")
      .select(PUBLIC_FUNCTIONS_COLUMNS)
      .eq("id", id)
      .eq("is_active", true)
      .gte("starts_at", new Date().toISOString())
      .maybeSingle();

    if (functionError) {
      logSupabaseQueryError("getReservationFunctionById", functionError);
      return mapFallbackReservationFunction(id);
    }

    if (!functionRow) {
      return null;
    }

    const { data: workRow, error: workError } = await client
      .from("works")
      .select("id, title, slug")
      .eq("id", functionRow.work_id)
      .eq("is_published", true)
      .maybeSingle();

    if (workError) {
      logSupabaseQueryError("getReservationFunctionById:work", workError);
      return null;
    }

    if (!workRow) {
      return null;
    }

    const event = mapFunctionRowToFunctionEvent(functionRow);
    const parts = toArgentinaDateParts(functionRow.starts_at);

    return {
      id: event.id,
      workId: workRow.id,
      workTitle: workRow.title,
      workSlug: workRow.slug,
      date: parts.date,
      time: parts.time,
      startsAtLabel: formatArgentinaDateTimeLabel(functionRow.starts_at),
      venueName: event.venueName,
      venueAddress: event.venueAddress,
      reservationUrl: event.reservationUrl,
      ticketPriceText: event.ticketPriceText ?? null,
    } satisfies ReservationFunctionSummary;
  } catch (error) {
    logSupabaseQueryError("getReservationFunctionById", error);
    return mapFallbackReservationFunction(id);
  }
});
