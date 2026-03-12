import { cache } from "react";
import { functionEvents as functionsFallback } from "@/data/functions";
import { works as worksFallback } from "@/data/works";
import { mapFunctionRowToFunctionEvent } from "@/lib/queries/mappers";
import {
  FUNCTIONS_COLUMNS,
  hasRows,
  logSupabaseQueryError,
  orderFunctionsWithWorks,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isFutureDateTime, sortFunctionEvents } from "@/lib/utils";
import type { FunctionEventWithWork, Work } from "@/types/content";
import { getPublishedWorks } from "./works";

function fallbackFunctionsWithWorks() {
  return sortFunctionEvents(functionsFallback).reduce<FunctionEventWithWork[]>(
    (accumulator, event) => {
      const work = worksFallback.find((item) => item.id === event.workId);

      if (work) {
        accumulator.push({ event, work });
      }

      return accumulator;
    },
    [],
  );
}

function combineFunctionsWithWorks(
  events: ReturnType<typeof mapFunctionRowToFunctionEvent>[],
  works: Work[],
) {
  const worksById = new Map(works.map((work) => [work.id, work]));

  return orderFunctionsWithWorks(
    events.reduce<FunctionEventWithWork[]>((accumulator, event) => {
      const work = worksById.get(event.workId);

      if (work) {
        accumulator.push({ event, work });
      }

      return accumulator;
    }, []),
  );
}

export const getFunctions = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return fallbackFunctionsWithWorks();
  }

  try {
    const [works, functionsResult] = await Promise.all([
      getPublishedWorks(),
      client
        .from("functions")
        .select(FUNCTIONS_COLUMNS)
        .order("starts_at", { ascending: true }),
    ]);

    if (functionsResult.error || !hasRows(functionsResult.data)) {
      if (functionsResult.error) {
        logSupabaseQueryError("getFunctions", functionsResult.error);
      }

      return fallbackFunctionsWithWorks();
    }

    return combineFunctionsWithWorks(
      functionsResult.data.map(mapFunctionRowToFunctionEvent),
      works,
    );
  } catch (error) {
    logSupabaseQueryError("getFunctions", error);
    return fallbackFunctionsWithWorks();
  }
});

export const getUpcomingFunctions = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return fallbackFunctionsWithWorks().filter(
      ({ event }) => event.active && isFutureDateTime(event.date, event.time),
    );
  }

  try {
    const [works, functionsResult] = await Promise.all([
      getPublishedWorks(),
      client
        .from("functions")
        .select(FUNCTIONS_COLUMNS)
        .eq("is_active", true)
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true }),
    ]);

    if (functionsResult.error || !hasRows(functionsResult.data)) {
      if (functionsResult.error) {
        logSupabaseQueryError("getUpcomingFunctions", functionsResult.error);
      }

      return fallbackFunctionsWithWorks().filter(
        ({ event }) => event.active && isFutureDateTime(event.date, event.time),
      );
    }

    return combineFunctionsWithWorks(
      functionsResult.data.map(mapFunctionRowToFunctionEvent),
      works,
    );
  } catch (error) {
    logSupabaseQueryError("getUpcomingFunctions", error);
    return fallbackFunctionsWithWorks().filter(
      ({ event }) => event.active && isFutureDateTime(event.date, event.time),
    );
  }
});

export const getFunctionsByWorkId = cache(async (workId: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return sortFunctionEvents(
      functionsFallback.filter(
        (event) =>
          event.workId === workId &&
          event.active &&
          isFutureDateTime(event.date, event.time),
      ),
    );
  }

  try {
    const { data, error } = await client
      .from("functions")
      .select(FUNCTIONS_COLUMNS)
      .eq("work_id", workId)
      .eq("is_active", true)
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true });

    if (error || !hasRows(data)) {
      if (error) {
        logSupabaseQueryError("getFunctionsByWorkId", error);
      }

      return sortFunctionEvents(
        functionsFallback.filter(
          (event) =>
            event.workId === workId &&
            event.active &&
            isFutureDateTime(event.date, event.time),
        ),
      );
    }

    return data.map(mapFunctionRowToFunctionEvent);
  } catch (error) {
    logSupabaseQueryError("getFunctionsByWorkId", error);
    return sortFunctionEvents(
      functionsFallback.filter(
        (event) =>
          event.workId === workId &&
          event.active &&
          isFutureDateTime(event.date, event.time),
      ),
    );
  }
});
