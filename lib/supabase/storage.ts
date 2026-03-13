import { isSupabaseConfigured, supabaseConfig } from "@/lib/supabase/config";

export const MEDIA_BUCKET_NAME = "media";

export const storageFolders = [
  "works",
  "news",
  "members",
  "group",
] as const;

export type StorageFolder = (typeof storageFolders)[number];

export type StorageUploadResult = {
  path: string;
  publicUrl: string;
};

const absoluteUrlPattern = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

function trimValue(value?: string | null) {
  return value?.trim() ?? "";
}

export function isStorageFolder(value: string): value is StorageFolder {
  return storageFolders.includes(value as StorageFolder);
}

export function isAbsoluteUrl(value: string) {
  return absoluteUrlPattern.test(value);
}

export function isLocalAssetPath(value: string) {
  return value.startsWith("/");
}

export function isStoragePath(value: string) {
  return Boolean(value) && !isAbsoluteUrl(value) && !isLocalAssetPath(value);
}

export function buildStoragePublicUrl(path: string) {
  const normalizedPath = trimValue(path);

  if (!normalizedPath) {
    return "";
  }

  if (!isSupabaseConfigured) {
    return normalizedPath;
  }

  const encodedPath = normalizedPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${supabaseConfig.url}/storage/v1/object/public/${MEDIA_BUCKET_NAME}/${encodedPath}`;
}

export function resolveStorageImageUrl(value?: string | null) {
  const normalizedValue = trimValue(value);

  if (!normalizedValue) {
    return "";
  }

  if (isAbsoluteUrl(normalizedValue) || isLocalAssetPath(normalizedValue)) {
    return normalizedValue;
  }

  return buildStoragePublicUrl(normalizedValue);
}

export function normalizeStoredImageValue(value?: string | null) {
  const normalizedValue = trimValue(value);

  if (!normalizedValue || !isAbsoluteUrl(normalizedValue) || !isSupabaseConfigured) {
    return normalizedValue;
  }

  try {
    const imageUrl = new URL(normalizedValue);
    const publicPrefix = new URL(
      `/storage/v1/object/public/${MEDIA_BUCKET_NAME}/`,
      supabaseConfig.url,
    );

    if (
      imageUrl.origin === publicPrefix.origin &&
      imageUrl.pathname.startsWith(publicPrefix.pathname)
    ) {
      return decodeURIComponent(imageUrl.pathname.slice(publicPrefix.pathname.length));
    }
  } catch {
    return normalizedValue;
  }

  return normalizedValue;
}

function sanitizeStorageSegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function getFileExtension(fileName: string) {
  const normalizedFileName = trimValue(fileName);
  const lastDotIndex = normalizedFileName.lastIndexOf(".");

  if (lastDotIndex < 0) {
    return "";
  }

  return normalizedFileName
    .slice(lastDotIndex + 1)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10);
}

export function buildStorageObjectPath(folder: StorageFolder, fileName: string) {
  const sanitizedName = sanitizeStorageSegment(fileName.replace(/\.[^.]+$/, ""));
  const extension = getFileExtension(fileName);
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const suffix = sanitizedName ? `-${sanitizedName}` : "";
  const extensionPart = extension ? `.${extension}` : "";

  return `${folder}/${timestamp}-${crypto.randomUUID()}${suffix}${extensionPart}`;
}
