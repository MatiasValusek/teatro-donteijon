export type SiteConfig = {
  groupName: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  footerDescription: string;
  email: string;
  pressEmail?: string;
  instagramUrl: string;
  instagramHandle: string;
  phone?: string;
  city: string;
};

export type SocialLink = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export type SiteHighlight = {
  kicker: string;
  title: string;
  description: string;
};
