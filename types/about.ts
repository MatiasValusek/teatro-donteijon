export type GroupMilestone = {
  label: string;
  title: string;
  description: string;
};

export type GroupGalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
};

export type GroupInfo = {
  name: string;
  shortName: string;
  subtitle: string;
  history: string[];
  manifesto: string[];
  highlightedQuote: string;
  heroImage: string;
  historyImage: string;
  contactEmail: string;
  instagramUrl: string;
  focusAreas: string[];
  manifestoPillars: string[];
  milestones: GroupMilestone[];
};

export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};
