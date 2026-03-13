import { cache } from "react";
import type { Member } from "@/types/about";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resolveStorageImageUrl } from "@/lib/supabase/storage";

const MEMBERS_BASE_COLUMNS =
  "id, name, role, bio, image_url, sort_order, is_active, created_at, updated_at";

type MemberRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

function mapMember(row: MemberRow): Member {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    image: resolveStorageImageUrl(row.image_url),
  };
}

export const getMembers = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("members")
    .select(MEMBERS_BASE_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error("No se pudieron obtener los integrantes activos.");
  }

  return (data ?? []).map((row) => mapMember(row as MemberRow));
});
