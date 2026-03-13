import type { SupabaseClient } from "@supabase/supabase-js";
import type { GroupInfo, Member } from "@/types/about";
import type { Database, TableRow } from "@/types/database";
import type { FunctionEvent, NewsPost, Work } from "@/types/content";

export type SupabaseDatabaseClient = SupabaseClient<Database>;

const argentinaDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Buenos_Aires",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function toArgentinaDateParts(isoDateTime: string) {
  const parts = argentinaDateTimeFormatter.formatToParts(new Date(isoDateTime));

  const lookup = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return {
    date: `${lookup.year}-${lookup.month}-${lookup.day}`,
    time: `${lookup.hour}:${lookup.minute}`,
  };
}

export function formatArgentinaDateTimeLabel(isoDateTime: string) {
  const parts = toArgentinaDateParts(isoDateTime);
  const [year, month, day] = parts.date.split("-");

  return `${day}/${month}/${year} - ${parts.time}`;
}

export function toArgentinaDateTimeLocalValue(isoDateTime: string) {
  const parts = toArgentinaDateParts(isoDateTime);

  return `${parts.date}T${parts.time}`;
}

export function groupRowsBy<Row, Key extends string>(
  rows: Row[],
  getKey: (row: Row) => Key,
) {
  return rows.reduce<Map<Key, Row[]>>((accumulator, row) => {
    const key = getKey(row);
    const existing = accumulator.get(key);

    if (existing) {
      existing.push(row);
      return accumulator;
    }

    accumulator.set(key, [row]);
    return accumulator;
  }, new Map<Key, Row[]>());
}

export function sortWorksForDisplay(items: Work[]) {
  return [...items].sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    if (left.status !== right.status) {
      return left.status === "active" ? -1 : 1;
    }

    return left.title.localeCompare(right.title);
  });
}

export function sortNewsForDisplay(items: NewsPost[]) {
  return [...items].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

export function sortMembersForDisplay(items: Member[]) {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

export function logSupabaseQueryError(scope: string, error: unknown) {
  console.error(`[supabase:${scope}]`, error);
}

export type GroupInfoRow = TableRow<"group_info">;
export type MemberRow = TableRow<"members">;
export type WorkRow = TableRow<"works">;
export type WorkGalleryRow = TableRow<"work_gallery">;
export type FunctionRow = TableRow<"functions">;
export type NewsPostRow = TableRow<"news_posts">;

export type PublicWorkRow = Pick<
  WorkRow,
  | "id"
  | "slug"
  | "title"
  | "short_description"
  | "full_description"
  | "genre"
  | "duration_minutes"
  | "status"
  | "director"
  | "cast"
  | "cover_image_url"
  | "featured"
>;

export type PublicFunctionRow = Pick<
  FunctionRow,
  | "id"
  | "work_id"
  | "starts_at"
  | "venue_name"
  | "venue_address"
  | "reservation_url"
  | "ticket_price_text"
  | "is_active"
>;

export type PublicNewsPostRow = Pick<
  NewsPostRow,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "content"
  | "cover_image_url"
  | "category"
  | "featured"
  | "published_at"
  | "created_at"
>;

export const GROUP_INFO_COLUMNS =
  "id, name, short_name, subtitle, history, manifesto, highlighted_quote, hero_image_url, contact_email, press_email, instagram_url, phone, city, created_at, updated_at";

export const MEMBERS_COLUMNS =
  "id, name, role, bio, image_url, sort_order, is_active, created_at, updated_at";

export const WORKS_COLUMNS =
  "id, slug, title, short_description, full_description, genre, duration_minutes, status, director, cast, cover_image_url, featured, is_published, sort_order, created_at, updated_at";

export const PUBLIC_WORKS_COLUMNS =
  "id, slug, title, short_description, full_description, genre, duration_minutes, status, director, cast, cover_image_url, featured";

export const WORK_GALLERY_COLUMNS =
  "id, work_id, image_url, alt_text, sort_order, created_at";

export const FUNCTIONS_COLUMNS =
  "id, work_id, starts_at, venue_name, venue_address, reservation_url, ticket_price_text, is_active, created_at, updated_at";

export const PUBLIC_FUNCTIONS_COLUMNS =
  "id, work_id, starts_at, venue_name, venue_address, reservation_url, ticket_price_text, is_active";

export const CONTACT_MESSAGES_COLUMNS =
  "id, full_name, email, subject, message, created_at";

export const RESERVATIONS_COLUMNS =
  "id, function_id, work_id, full_name, email, phone, quantity, message, status, created_at";

export const NEWS_POSTS_COLUMNS =
  "id, slug, title, excerpt, content, cover_image_url, category, featured, is_published, published_at, created_at, updated_at";

export const PUBLIC_NEWS_POSTS_COLUMNS =
  "id, slug, title, excerpt, content, cover_image_url, category, featured, published_at, created_at";

export function orderFunctionsWithWorks(
  items: Array<{ event: FunctionEvent; work: Work }>,
) {
  return [...items].sort((left, right) => {
    const leftDate = new Date(`${left.event.date}T${left.event.time}:00`).getTime();
    const rightDate = new Date(
      `${right.event.date}T${right.event.time}:00`,
    ).getTime();

    return leftDate - rightDate;
  });
}

export function orderGroupInfoFallback(group: GroupInfo) {
  return {
    ...group,
    milestones: [...group.milestones],
    history: [...group.history],
    manifesto: [...group.manifesto],
    focusAreas: [...group.focusAreas],
    manifestoPillars: [...group.manifestoPillars],
  };
}
