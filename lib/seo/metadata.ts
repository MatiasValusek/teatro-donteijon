import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const siteUrl = "https://vamosdenuevo.ar";
const locale = "es_AR";
const defaultOgImagePath = "/opengraph-image";
const defaultTwitterImagePath = "/twitter-image";

const defaultDescription =
  "Vamos de Nuevo (VdN) es un grupo de teatro independiente dedicado a la creacion escenica, la produccion de obras y el encuentro con el publico.";

const defaultKeywords = [
  "Vamos de Nuevo",
  "VdN",
  "teatro independiente",
  "grupo de teatro",
  "obras teatrales",
  "funciones teatrales",
  "novedades culturales",
  "La Plata",
  "Buenos Aires",
];

type SeoImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
  image?: string | null;
  imageAlt?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
};

export function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function buildAbsoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(normalizePath(path), siteUrl).toString();
}

export function buildPageTitle(title: string, section?: string) {
  return section ? `${title} | ${section}` : title;
}

export function buildDescriptionFallback(...candidates: Array<string | null | undefined>) {
  const match = candidates.find(
    (candidate) => typeof candidate === "string" && candidate.trim().length > 0,
  );

  return match?.trim() ?? defaultDescription;
}

export function buildPublishedTime(value?: string | null) {
  if (!value) {
    return undefined;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value}T00:00:00-03:00`;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toISOString();
}

function buildFullTitle(title: string) {
  if (
    title === siteConfig.name ||
    title.endsWith(`| ${siteConfig.name}`)
  ) {
    return title;
  }

  return `${title} | ${siteConfig.name}`;
}

function buildMetadataImages(
  title: string,
  image?: string | null,
  imageAlt?: string | null,
): SeoImage[] {
  if (!image) {
    return [
      {
        url: buildAbsoluteUrl(defaultOgImagePath),
        alt: buildFullTitle(title),
        width: 1200,
        height: 630,
      },
    ];
  }

  return [
    {
      url: buildAbsoluteUrl(image),
      alt: imageAlt?.trim() || buildFullTitle(title),
    },
  ];
}

export const publicRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
      url: siteUrl,
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: defaultKeywords,
  robots: publicRobots,
  openGraph: {
    title: siteConfig.name,
    description: defaultDescription,
    url: siteUrl,
    siteName: siteConfig.name,
    locale,
    type: "website",
    images: buildMetadataImages(siteConfig.name),
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: defaultDescription,
    images: [buildAbsoluteUrl(defaultTwitterImagePath)],
  },
  manifest: "/manifest.webmanifest",
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  noIndex = false,
  publishedTime,
}: PageMetadataInput): Metadata {
  const canonicalPath = normalizePath(path);
  const fullTitle = buildFullTitle(title);
  const images = buildMetadataImages(title, image, imageAlt);
  const normalizedDescription = buildDescriptionFallback(description);
  const normalizedPublishedTime = buildPublishedTime(publishedTime);

  const openGraphBase = {
    title: fullTitle,
    description: normalizedDescription,
    url: buildAbsoluteUrl(canonicalPath),
    siteName: siteConfig.name,
    locale,
    images,
  };

  const openGraph =
    type === "article"
      ? {
          ...openGraphBase,
          type,
          ...(normalizedPublishedTime ? { publishedTime: normalizedPublishedTime } : {}),
        }
      : {
          ...openGraphBase,
          type,
        };

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: canonicalPath,
    },
    robots: noIndex ? noIndexRobots : undefined,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: normalizedDescription,
      images: images.map((entry) => entry.url),
    },
  };
}

export function createNotFoundMetadata(
  title: string,
  section: string,
  path: string,
): Metadata {
  return createPageMetadata({
    title: buildPageTitle(title, section),
    description:
      "El contenido que intentas abrir no esta disponible o ya no forma parte del sitio publico.",
    path,
    noIndex: true,
  });
}

export const seoSite = {
  url: siteUrl,
  locale,
  defaultDescription,
  defaultOgImagePath,
};
