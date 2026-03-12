import { functionEvents } from "@/data/functions";
import { newsPosts } from "@/data/news";
import { works } from "@/data/works";
import type {
  FunctionEvent,
  FunctionEventWithWork,
  NewsPost,
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

function sortNewsPosts(posts: NewsPost[]) {
  return [...posts].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

export function getNewsPosts() {
  return sortNewsPosts(newsPosts);
}

export function getNewsPostBySlug(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}

export function getFeaturedNewsPost() {
  const orderedPosts = getNewsPosts();

  return orderedPosts.find((post) => post.featured) ?? orderedPosts[0];
}

export function getRecentNewsPosts(limit = 3, excludeSlug?: NewsPost["slug"]) {
  return getNewsPosts()
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);
}

export function getRelatedNewsPosts(post: NewsPost, limit = 3) {
  const orderedPosts = getNewsPosts().filter((item) => item.slug !== post.slug);
  const sameCategory = orderedPosts.filter((item) => item.category === post.category);
  const otherPosts = orderedPosts.filter((item) => item.category !== post.category);

  return [...sameCategory, ...otherPosts].slice(0, limit);
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
