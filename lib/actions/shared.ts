import { getAdminQueryClient } from "@/lib/admin/auth";
import { createSupabaseServerClient, getSupabaseServerClient } from "@/lib/supabase/server";
import { normalizeStoredImageValue } from "@/lib/supabase/storage";

export function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
}

export function getStoredImageValue(formData: FormData, key: string) {
  return normalizeStoredImageValue(getString(formData, key));
}

export function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getList(formData: FormData, key: string) {
  return getString(formData, key)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getInteger(
  formData: FormData,
  key: string,
  options?: {
    min?: number;
    fallback?: number;
  },
) {
  const rawValue = getString(formData, key);

  if (!rawValue) {
    return {
      value: options?.fallback ?? 0,
      error: undefined,
    };
  }

  const parsed = Number(rawValue);

  if (!Number.isInteger(parsed)) {
    return {
      value: options?.fallback ?? 0,
      error: "Ingresa un numero entero valido.",
    };
  }

  if (options?.min !== undefined && parsed < options.min) {
    return {
      value: parsed,
      error: `Debe ser mayor o igual a ${options.min}.`,
    };
  }

  return {
    value: parsed,
    error: undefined,
  };
}

export function getRequiredInteger(
  formData: FormData,
  key: string,
  options?: {
    min?: number;
  },
) {
  const rawValue = getString(formData, key);

  if (!rawValue) {
    return {
      value: 0,
      error: "Completa este campo.",
    };
  }

  const parsed = Number(rawValue);

  if (!Number.isInteger(parsed)) {
    return {
      value: 0,
      error: "Ingresa un numero entero valido.",
    };
  }

  if (options?.min !== undefined && parsed < options.min) {
    return {
      value: parsed,
      error: `Debe ser mayor o igual a ${options.min}.`,
    };
  }

  return {
    value: parsed,
    error: undefined,
  };
}

export function getRequiredDateTimeIso(formData: FormData, key: string) {
  const rawValue = getString(formData, key);

  if (!rawValue) {
    return {
      value: null,
      error: "Completa este campo.",
    };
  }

  const parsed = new Date(`${rawValue}:00-03:00`);

  if (Number.isNaN(parsed.getTime())) {
    return {
      value: null,
      error: "La fecha no es valida.",
    };
  }

  return {
    value: parsed.toISOString(),
    error: undefined,
  };
}

export function getOptionalDateTimeIso(formData: FormData, key: string) {
  const rawValue = getString(formData, key);

  if (!rawValue) {
    return {
      value: null,
      error: undefined,
    };
  }

  const parsed = new Date(`${rawValue}:00-03:00`);

  if (Number.isNaN(parsed.getTime())) {
    return {
      value: null,
      error: "La fecha no es valida.",
    };
  }

  return {
    value: parsed.toISOString(),
    error: undefined,
  };
}

export function hasFieldErrors(fieldErrors: Record<string, string>) {
  return Object.keys(fieldErrors).length > 0;
}

export function ensureRequired(
  fieldErrors: Record<string, string>,
  key: string,
  value: string | null,
  message = "Completa este campo.",
) {
  if (!value || value.trim().length === 0) {
    fieldErrors[key] = message;
  }
}

export function ensureEmail(
  fieldErrors: Record<string, string>,
  key: string,
  value: string | null,
  message = "Ingresa un email valido.",
) {
  if (!value || !isValidEmail(value.trim())) {
    fieldErrors[key] = message;
  }
}

export async function getMutationClient() {
  return getAdminQueryClient();
}

export function getPublicMutationClient() {
  return createSupabaseServerClient() ?? getSupabaseServerClient();
}

export function getSupabaseErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.length > 0
  ) {
    return error.message;
  }

  return fallback;
}
