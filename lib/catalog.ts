import { functionEvents } from "@/data/functions";
import { works } from "@/data/works";
import type {
  FunctionEvent,
  FunctionEventWithWork,
  Work,
} from "@/types/content";
import { isFutureDateTime, sortFunctionEvents } from "@/lib/utils";

export function getWorks() {
  return works;
}

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function getWorkById(id: Work["id"]) {
  return works.find((work) => work.id === id);
}

export function getActiveWorks() {
  return works.filter((work) => work.status === "active");
}

export function getFunctionEvents() {
  return functionEvents;
}

export function getActiveFunctionEvents() {
  return sortFunctionEvents(
    functionEvents.filter((event) => event.active),
  );
}

export function getUpcomingFunctionEvents() {
  return sortFunctionEvents(
    functionEvents.filter(
      (event) => event.active && isFutureDateTime(event.date, event.time),
    ),
  );
}

export function getFunctionsByWorkId(workId: Work["id"]) {
  return sortFunctionEvents(
    functionEvents.filter(
      (event) =>
        event.workId === workId &&
        event.active &&
        isFutureDateTime(event.date, event.time),
    ),
  );
}

export function getUpcomingFunctionEventsWithWorks() {
  return getUpcomingFunctionEvents().reduce<FunctionEventWithWork[]>(
    (accumulator, event) => {
      const work = getWorkById(event.workId);

      if (work) {
        accumulator.push({ event, work });
      }

      return accumulator;
    },
    [],
  );
}

export function groupActiveFunctionsByWork() {
  return getActiveFunctionEvents().reduce<Record<Work["id"], FunctionEvent[]>>(
    (accumulator, event) => {
      if (!accumulator[event.workId]) {
        accumulator[event.workId] = [];
      }

      accumulator[event.workId].push(event);
      return accumulator;
    },
    {} as Record<Work["id"], FunctionEvent[]>,
  );
}
