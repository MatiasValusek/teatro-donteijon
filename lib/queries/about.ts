import { cache } from "react";
import {
  groupGallery as groupGalleryFallback,
  groupInfo as groupInfoFallback,
} from "@/data/group";
import { members as membersFallback } from "@/data/members";
import {
  mapGroupGalleryRowToImage,
  mapGroupInfoRowToGroupInfo,
  mapMemberRowToMember,
} from "@/lib/queries/mappers";
import {
  GROUP_GALLERY_COLUMNS,
  GROUP_INFO_COLUMNS,
  GROUP_MILESTONES_COLUMNS,
  MEMBERS_COLUMNS,
  logSupabaseQueryError,
  orderGroupInfoFallback,
  sortMembersForDisplay,
} from "@/lib/queries/shared";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const getGroupInfo = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return orderGroupInfoFallback(groupInfoFallback);
  }

  try {
    const { data: row, error } = await client
      .from("group_info")
      .select(GROUP_INFO_COLUMNS)
      .maybeSingle();

    if (error || !row) {
      if (error) {
        logSupabaseQueryError("getGroupInfo", error);
      }

      return orderGroupInfoFallback(groupInfoFallback);
    }

    const { data: milestones, error: milestonesError } = await client
      .from("group_milestones")
      .select(GROUP_MILESTONES_COLUMNS)
      .eq("group_info_id", row.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (milestonesError) {
      logSupabaseQueryError("getGroupInfo:milestones", milestonesError);
      return orderGroupInfoFallback(groupInfoFallback);
    }

    return mapGroupInfoRowToGroupInfo(row, milestones ?? []);
  } catch (error) {
    logSupabaseQueryError("getGroupInfo", error);
    return orderGroupInfoFallback(groupInfoFallback);
  }
});

export const getGroupGallery = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return groupGalleryFallback;
  }

  try {
    const { data: groupRow, error: groupError } = await client
      .from("group_info")
      .select("id")
      .maybeSingle();

    if (groupError || !groupRow) {
      if (groupError) {
        logSupabaseQueryError("getGroupGallery:group", groupError);
      }

      return groupGalleryFallback;
    }

    const { data, error } = await client
      .from("group_gallery")
      .select(GROUP_GALLERY_COLUMNS)
      .eq("group_info_id", groupRow.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      logSupabaseQueryError("getGroupGallery", error);
      return groupGalleryFallback;
    }

    return (data ?? []).map(mapGroupGalleryRowToImage);
  } catch (error) {
    logSupabaseQueryError("getGroupGallery", error);
    return groupGalleryFallback;
  }
});

export const getMembers = cache(async () => {
  const client = getSupabaseServerClient();

  if (!client) {
    return sortMembersForDisplay(membersFallback);
  }

  try {
    const { data, error } = await client
      .from("members")
      .select(MEMBERS_COLUMNS)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      logSupabaseQueryError("getMembers", error);
      return sortMembersForDisplay(membersFallback);
    }

    return (data ?? []).map(mapMemberRowToMember);
  } catch (error) {
    logSupabaseQueryError("getMembers", error);
    return sortMembersForDisplay(membersFallback);
  }
});
