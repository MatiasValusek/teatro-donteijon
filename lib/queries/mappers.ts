import type { GroupInfo, Member } from "@/types/about";
import type { FunctionEvent, NewsPost, Work } from "@/types/content";
import type {
  GroupInfoRow,
  MemberRow,
  PublicFunctionRow,
  PublicNewsPostRow,
  PublicWorkRow,
  WorkGalleryRow,
} from "@/lib/queries/shared";
import { toArgentinaDateParts } from "@/lib/queries/shared";
import { resolveStorageImageUrl } from "@/lib/supabase/storage";

export function mapGroupInfoRowToGroupInfo(
  row: GroupInfoRow,
): GroupInfo {
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
    coverAlt: row.title,
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
    artisticText: undefined,
    technicalSheet: [],
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
    coverAlt: row.title,
    gallery: [],
    category: row.category,
    publishedAt: parts.date,
    featured: row.featured,
  };
}
