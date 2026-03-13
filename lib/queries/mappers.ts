import type { GroupGalleryImage, GroupInfo, GroupMilestone, Member } from "@/types/about";
import type { FunctionEvent, NewsPost, Work } from "@/types/content";
import type {
  GroupGalleryRow,
  GroupInfoRow,
  GroupMilestoneRow,
  MemberRow,
  NewsGalleryRow,
  PublicFunctionRow,
  PublicNewsPostRow,
  PublicWorkRow,
  WorkGalleryRow,
} from "@/lib/queries/shared";
import { toArgentinaDateParts } from "@/lib/queries/shared";
import { resolveStorageImageUrl } from "@/lib/supabase/storage";

export function mapGroupMilestoneRowToMilestone(
  row: GroupMilestoneRow,
): GroupMilestone {
  return {
    label: row.label,
    title: row.title,
    description: row.description,
  };
}

export function mapGroupInfoRowToGroupInfo(
  row: GroupInfoRow,
  milestones: GroupMilestoneRow[],
): GroupInfo {
  return {
    name: row.name,
    shortName: row.short_name,
    subtitle: row.subtitle,
    history: row.history,
    manifesto: row.manifesto,
    highlightedQuote: row.highlighted_quote,
    heroImage: resolveStorageImageUrl(row.hero_image_url),
    historyImage: resolveStorageImageUrl(row.history_image_url),
    contactEmail: row.contact_email,
    instagramUrl: row.instagram_url,
    focusAreas: row.focus_areas,
    manifestoPillars: row.manifesto_pillars,
    milestones: milestones.map(mapGroupMilestoneRowToMilestone),
  };
}

export function mapGroupGalleryRowToImage(row: GroupGalleryRow): GroupGalleryImage {
  return {
    id: row.id,
    src: resolveStorageImageUrl(row.image_url),
    alt: row.alt_text,
    caption: row.caption,
    category: row.category,
  };
}

export function mapMemberRowToMember(row: MemberRow): Member {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    image: resolveStorageImageUrl(row.image_url),
  };
}

export function mapWorkRowToWork(
  row: PublicWorkRow,
  galleryRows: WorkGalleryRow[],
): Work {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    coverImage: resolveStorageImageUrl(row.cover_image_url),
    coverAlt: row.cover_image_alt,
    gallery: galleryRows.map((image) => ({
      src: resolveStorageImageUrl(image.image_url),
      alt: image.alt_text,
    })),
    genre: row.genre,
    durationMinutes: row.duration_minutes,
    status: row.status,
    director: row.director,
    cast: row.cast,
    featured: row.featured,
    artisticText: row.artistic_text ?? undefined,
    technicalSheet: row.technical_sheet,
  };
}

export function mapFunctionRowToFunctionEvent(row: PublicFunctionRow): FunctionEvent {
  const parts = toArgentinaDateParts(row.starts_at);

  return {
    id: row.id,
    workId: row.work_id,
    date: parts.date,
    time: parts.time,
    venueName: row.venue_name,
    venueAddress: row.venue_address,
    reservationUrl: row.reservation_url,
    ticketPriceText: row.ticket_price_text,
    active: row.is_active,
  };
}

export function mapNewsPostRowToNewsPost(
  row: PublicNewsPostRow,
  galleryRows: NewsGalleryRow[],
): NewsPost {
  const publishedAt = row.published_at ?? row.created_at;
  const parts = toArgentinaDateParts(publishedAt);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: resolveStorageImageUrl(row.cover_image_url),
    coverAlt: row.cover_image_alt,
    gallery: galleryRows.map((image) => ({
      src: resolveStorageImageUrl(image.image_url),
      alt: image.alt_text,
    })),
    category: row.category,
    publishedAt: parts.date,
    featured: row.featured,
  };
}
