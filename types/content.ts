export type Tone = "ember" | "garnet" | "gold";

export type WorkStage = "repertorio" | "estreno" | "laboratorio";

export type PerformanceAvailability = "abierta" | "ultimas" | "proxima";

export type NewsCategory = "estreno" | "gira" | "proceso";

export type Work = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  durationMinutes: number;
  premiereSeason: string;
  stage: WorkStage;
  tone: Tone;
  featured?: boolean;
  tags: string[];
  cast: string[];
  direction: string;
};

export type Performance = {
  id: string;
  workSlug: Work["slug"];
  venue: string;
  city: string;
  date: string;
  time: string;
  availability: PerformanceAvailability;
  tags: string[];
  ticketUrl?: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: NewsCategory;
  tone: Tone;
  tags: string[];
};

export type ContactChannel = {
  label: string;
  title: string;
  description: string;
};
