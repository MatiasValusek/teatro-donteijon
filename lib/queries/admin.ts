import { cache } from "react";
import type { TableRow } from "@/types/database";
import {
  FUNCTIONS_COLUMNS,
  formatArgentinaDateTimeLabel,
  GROUP_INFO_COLUMNS,
  MEMBERS_COLUMNS,
  NEWS_POSTS_COLUMNS,
  WORKS_COLUMNS,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";

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

export const getAdminDashboardSummary = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return {
      worksCount: 0,
      functionsCount: 0,
      newsCount: 0,
      membersCount: 0,
      hasGroupInfo: false,
    };
  }

  const [worksResult, functionsResult, newsResult, membersResult, groupResult] =
    await Promise.all([
      client.from("works").select("id", { count: "exact", head: true }),
      client.from("functions").select("id", { count: "exact", head: true }),
      client.from("news_posts").select("id", { count: "exact", head: true }),
      client.from("members").select("id", { count: "exact", head: true }),
      client.from("group_info").select("id", { count: "exact", head: true }),
    ]);

  return {
    worksCount: worksResult.count ?? 0,
    functionsCount: functionsResult.count ?? 0,
    newsCount: newsResult.count ?? 0,
    membersCount: membersResult.count ?? 0,
    hasGroupInfo: (groupResult.count ?? 0) > 0,
  };
});

export const getAdminWorks = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [] as AdminWorkRow[];
  }

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
});

export const getAdminWorkById = cache(async (id: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("works")
    .select(WORKS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
});

export const getAdminWorkOptions = cache(async () => {
  const rows = await getAdminWorks();

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
  }));
});

export const getAdminFunctions = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [] as AdminFunctionListItem[];
  }

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
});

export const getAdminFunctionById = cache(async (id: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("functions")
    .select(FUNCTIONS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
});

export const getAdminNewsPosts = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [] as AdminNewsListItem[];
  }

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
});

export const getAdminNewsPostById = cache(async (id: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("news_posts")
    .select(NEWS_POSTS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
});

export const getAdminMembers = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [] as AdminMemberRow[];
  }

  const { data, error } = await client
    .from("members")
    .select(MEMBERS_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
});

export const getAdminMemberById = cache(async (id: string) => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("members")
    .select(MEMBERS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
});

export const getAdminGroupInfo = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null as AdminGroupInfoRow | null;
  }

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
});
