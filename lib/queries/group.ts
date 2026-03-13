import { cache } from "react";
import type { GroupInfo } from "@/types/about";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resolveStorageImageUrl } from "@/lib/supabase/storage";

const GROUP_INFO_BASE_COLUMNS =
  "id, name, short_name, subtitle, history, manifesto, highlighted_quote, hero_image_url, contact_email, press_email, instagram_url, phone, city, created_at, updated_at";

type GroupInfoBaseRow = {
  id: string;
  name: string;
  short_name: string;
  subtitle: string;
  history: string[];
  manifesto: string[];
  highlighted_quote: string;
  hero_image_url: string;
  contact_email: string;
  press_email: string | null;
  instagram_url: string;
  phone: string | null;
  city: string;
  created_at: string;
  updated_at: string;
};

function mapGroupInfo(row: GroupInfoBaseRow): GroupInfo {
  const heroImage = resolveStorageImageUrl(row.hero_image_url);

  return {
    name: row.name,
    shortName: row.short_name,
    subtitle: row.subtitle,
    history: row.history,
    manifesto: row.manifesto,
    highlightedQuote: row.highlighted_quote,
    heroImage,
    historyImage: heroImage,
    contactEmail: row.contact_email,
    instagramUrl: row.instagram_url,
    focusAreas: [],
    manifestoPillars: [],
    milestones: [],
  };
}

export const getGroupInfo = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("group_info")
    .select(GROUP_INFO_BASE_COLUMNS)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error("No se pudo obtener la informacion del grupo.");
  }

  if (!data) {
    return null;
  }

  return mapGroupInfo(data as GroupInfoBaseRow);
});
