"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DatabaseEnum } from "@/types/database";
import type { AdminFormState } from "./form-state";
import {
  ensureRequired,
  getBoolean,
  getMutationClient,
  getOptionalDateTimeIso,
  getStoredImageValue,
  getString,
  getSupabaseErrorMessage,
  hasFieldErrors,
  normalizeSlug,
} from "./shared";

function parseNewsPayload(formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  const title = getString(formData, "title");
  const slug = normalizeSlug(getString(formData, "slug"));
  const excerpt = getString(formData, "excerpt");
  const content = getString(formData, "content");
  const coverImageUrl = getStoredImageValue(formData, "cover_image_url");
  const category = getString(formData, "category") as DatabaseEnum<"news_category">;
  const featured = getBoolean(formData, "featured");
  const isPublished = getBoolean(formData, "is_published");
  const publishedAt = getOptionalDateTimeIso(formData, "published_at");

  ensureRequired(fieldErrors, "title", title);
  ensureRequired(fieldErrors, "slug", slug);
  ensureRequired(fieldErrors, "excerpt", excerpt);
  ensureRequired(fieldErrors, "content", content);
  ensureRequired(fieldErrors, "cover_image_url", coverImageUrl);

  if (
    category !== "anuncio" &&
    category !== "estreno" &&
    category !== "festival" &&
    category !== "prensa" &&
    category !== "taller"
  ) {
    fieldErrors.category = "Selecciona una categoria valida.";
  }

  if (publishedAt.error) {
    fieldErrors.published_at = publishedAt.error;
  }

  return {
    fieldErrors,
    payload: {
      title,
      slug,
      excerpt,
      content,
      cover_image_url: coverImageUrl,
      category,
      featured,
      is_published: isPublished,
      published_at: isPublished
        ? publishedAt.value ?? new Date().toISOString()
        : publishedAt.value,
    },
  };
}

function newsErrorState(error: unknown): AdminFormState {
  const message = getSupabaseErrorMessage(
    error,
    "No se pudo guardar la novedad.",
  );

  if (message.includes("news_posts_slug_lower_uidx")) {
    return {
      fieldErrors: {
        slug: "Ese slug ya existe.",
      },
    };
  }

  return {
    error: message,
  };
}

export async function createNewsPost(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const { fieldErrors, payload } = parseNewsPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = await getMutationClient();
    const { data, error } = await client
      .from("news_posts")
      .insert(payload)
      .select("id, slug")
      .single();

    if (error) {
      return newsErrorState(error);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/novedades");
    revalidatePath("/novedades");
    revalidatePath(`/novedades/${data.slug}`);
    redirect(`/admin/novedades/${data.id}?saved=1`);
  } catch (error) {
    return newsErrorState(error);
  }
}

export async function updateNewsPost(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const id = getString(formData, "id");

  if (!id) {
    return {
      error: "Falta el identificador de la novedad.",
    };
  }

  const { fieldErrors, payload } = parseNewsPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = await getMutationClient();
    const { data, error } = await client
      .from("news_posts")
      .update(payload)
      .eq("id", id)
      .select("id, slug")
      .maybeSingle();

    if (error) {
      return newsErrorState(error);
    }

    if (!data) {
      return {
        error: "La novedad que intentaste editar ya no existe.",
      };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/novedades");
    revalidatePath("/novedades");
    revalidatePath(`/novedades/${data.slug}`);
    redirect(`/admin/novedades/${data.id}?saved=1`);
  } catch (error) {
    return newsErrorState(error);
  }
}
