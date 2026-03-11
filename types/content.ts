export type Tone = "ember" | "garnet" | "gold";

export type WorkStatus = "active" | "archive";

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

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: "estreno" | "gira" | "proceso";
  tone: Tone;
  tags: string[];
};

export type ContactChannel = {
  label: string;
  title: string;
  description: string;
};
