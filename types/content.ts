import type { DatabaseEnum } from "@/types/database";

export type WorkStatus = DatabaseEnum<"work_status">;

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Work = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  coverAlt: string;
  gallery: GalleryImage[];
  genre: string;
  durationMinutes: number;
  status: WorkStatus;
  director: string;
  cast: string[];
  featured: boolean;
  artisticText?: string;
  technicalSheet: string[];
};

export type FunctionEvent = {
  id: string;
  workId: Work["id"];
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  reservationUrl: string;
  active: boolean;
};

export type FunctionEventWithWork = {
  event: FunctionEvent;
  work: Work;
};

export type NewsCategory = DatabaseEnum<"news_category">;

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverAlt?: string;
  gallery?: GalleryImage[];
  category: NewsCategory;
  publishedAt: string;
  featured: boolean;
};

export type ContactChannel = {
  label: string;
  title: string;
  description: string;
};
