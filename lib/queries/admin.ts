import type { TableRow } from "@/types/database";
import type {
  AdminContactMessageListItem,
  AdminReservationListItem,
} from "@/types/inbox";
import { getAdminQueryClient } from "@/lib/admin/auth";
import {
  CONTACT_MESSAGES_COLUMNS,
  FUNCTIONS_COLUMNS,
  formatArgentinaDateTimeLabel,
  GROUP_INFO_COLUMNS,
  MEMBERS_COLUMNS,
  NEWS_POSTS_COLUMNS,
  RESERVATIONS_COLUMNS,
  WORKS_COLUMNS,
} from "@/lib/queries/shared";

export type AdminWorkRow = TableRow<"works">;
export type AdminFunctionRow = TableRow<"functions">;
export type AdminNewsPostRow = TableRow<"news_posts">;
export type AdminMemberRow = TableRow<"members">;
export type AdminGroupInfoRow = TableRow<"group_info">;

export type AdminFunctionListItem = AdminFunctionRow & {
  workTitle: string | null;
  startsAtLabel: string;
};

export type AdminNewsListItem = AdminNewsPostRow & {
  publishedAtLabel: string;
};

export async function getAdminDashboardSummary() {
  const client = await getAdminQueryClient();

  const [
    worksResult,
    functionsResult,
    newsResult,
    membersResult,
    groupResult,
    reservationsResult,
    contactMessagesResult,
  ] =
    await Promise.all([
      client.from("works").select("id", { count: "exact", head: true }),
      client.from("functions").select("id", { count: "exact", head: true }),
      client.from("news_posts").select("id", { count: "exact", head: true }),
      client.from("members").select("id", { count: "exact", head: true }),
      client.from("group_info").select("id", { count: "exact", head: true }),
      client.from("reservations").select("id", { count: "exact", head: true }),
      client
        .from("contact_messages")
        .select("id", { count: "exact", head: true }),
    ]);

  return {
    worksCount: worksResult.count ?? 0,
    functionsCount: functionsResult.count ?? 0,
    newsCount: newsResult.count ?? 0,
    membersCount: membersResult.count ?? 0,
    hasGroupInfo: (groupResult.count ?? 0) > 0,
    reservationsCount: reservationsResult.count ?? 0,
    contactMessagesCount: contactMessagesResult.count ?? 0,
  };
}

export async function getAdminWorks() {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("works")
    .select(WORKS_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("featured", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getAdminWorkById(id: string) {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("works")
    .select(WORKS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAdminWorkOptions() {
  const rows = await getAdminWorks();

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
  }));
}

export async function getAdminFunctions() {
  const client = await getAdminQueryClient();

  const [functionsResult, works] = await Promise.all([
    client
      .from("functions")
      .select(FUNCTIONS_COLUMNS)
      .order("starts_at", { ascending: true }),
    getAdminWorkOptions(),
  ]);

  if (functionsResult.error) {
    throw functionsResult.error;
  }

  const workMap = new Map(works.map((work) => [work.id, work.title]));

  return (functionsResult.data ?? []).map((row) => {
    return {
      ...row,
      workTitle: workMap.get(row.work_id) ?? null,
      startsAtLabel: formatArgentinaDateTimeLabel(row.starts_at),
    };
  });
}

export async function getAdminFunctionById(id: string) {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("functions")
    .select(FUNCTIONS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAdminNewsPosts() {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("news_posts")
    .select(NEWS_POSTS_COLUMNS)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    ...row,
    publishedAtLabel: row.published_at
      ? formatArgentinaDateTimeLabel(row.published_at)
      : "Sin fecha",
  }));
}

export async function getAdminNewsPostById(id: string) {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("news_posts")
    .select(NEWS_POSTS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAdminMembers() {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("members")
    .select(MEMBERS_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getAdminMemberById(id: string) {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("members")
    .select(MEMBERS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAdminGroupInfo() {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("group_info")
    .select(GROUP_INFO_COLUMNS)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAdminReservations(): Promise<AdminReservationListItem[]> {
  const client = await getAdminQueryClient();

  const [reservationsResult, functionsResult, worksResult] = await Promise.all([
    client
      .from("reservations")
      .select(RESERVATIONS_COLUMNS)
      .order("created_at", { ascending: false }),
    client.from("functions").select("id, starts_at, venue_name"),
    client.from("works").select("id, title"),
  ]);

  if (reservationsResult.error) {
    throw reservationsResult.error;
  }

  if (functionsResult.error) {
    throw functionsResult.error;
  }

  if (worksResult.error) {
    throw worksResult.error;
  }

  const worksById = new Map(
    (worksResult.data ?? []).map((row) => [row.id, row.title]),
  );
  const functionsById = new Map(
    (functionsResult.data ?? []).map((row) => [
      row.id,
      `${formatArgentinaDateTimeLabel(row.starts_at)} - ${row.venue_name}`,
    ]),
  );

  return (reservationsResult.data ?? []).map((row) => ({
    id: row.id,
    functionId: row.function_id,
    workId: row.work_id,
    workTitle: worksById.get(row.work_id) ?? "Obra sin asociar",
    functionLabel:
      functionsById.get(row.function_id) ?? "Funcion sin datos visibles",
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    quantity: row.quantity,
    message: row.message,
    status: row.status,
    createdAtLabel: formatArgentinaDateTimeLabel(row.created_at),
  }));
}

export async function getAdminContactMessages(): Promise<
  AdminContactMessageListItem[]
> {
  const client = await getAdminQueryClient();

  const { data, error } = await client
    .from("contact_messages")
    .select(CONTACT_MESSAGES_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    createdAtLabel: formatArgentinaDateTimeLabel(row.created_at),
  }));
}
