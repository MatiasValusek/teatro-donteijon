"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DatabaseEnum } from "@/types/database";
import type { AdminFormState } from "./form-state";
import {
  ensureRequired,
  getBoolean,
  getInteger,
  getList,
  getMutationClient,
  getString,
  getSupabaseErrorMessage,
  hasFieldErrors,
  normalizeSlug,
} from "./shared";

function parseWorkPayload(formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  const title = getString(formData, "title");
  const slug = normalizeSlug(getString(formData, "slug"));
  const shortDescription = getString(formData, "short_description");
  const fullDescription = getString(formData, "full_description");
  const genre = getString(formData, "genre");
  const director = getString(formData, "director");
  const coverImageUrl = getString(formData, "cover_image_url");
  const cast = getList(formData, "cast");
  const featured = getBoolean(formData, "featured");
  const isPublished = getBoolean(formData, "is_published");
  const duration = getInteger(formData, "duration_minutes", { min: 1 });
  const sortOrder = getInteger(formData, "sort_order", { min: 0, fallback: 0 });
  const status = getString(formData, "status") as DatabaseEnum<"work_status">;

  ensureRequired(fieldErrors, "title", title);
  ensureRequired(fieldErrors, "slug", slug);
  ensureRequired(fieldErrors, "short_description", shortDescription);
  ensureRequired(fieldErrors, "full_description", fullDescription);
  ensureRequired(fieldErrors, "genre", genre);
  ensureRequired(fieldErrors, "director", director);
  ensureRequired(fieldErrors, "cover_image_url", coverImageUrl);

  if (duration.error) {
    fieldErrors.duration_minutes = duration.error;
  }

  if (sortOrder.error) {
    fieldErrors.sort_order = sortOrder.error;
  }

  if (status !== "active" && status !== "archive") {
    fieldErrors.status = "Selecciona un estado valido.";
  }

  return {
    fieldErrors,
    payload: {
      title,
      slug,
      short_description: shortDescription,
      full_description: fullDescription,
      genre,
      duration_minutes: duration.value,
      status,
      director,
      cast,
      cover_image_url: coverImageUrl,
      cover_image_alt: title ? `Poster de ${title}` : "Poster de la obra",
      featured,
      is_published: isPublished,
      sort_order: sortOrder.value,
      artistic_text: null,
      technical_sheet: [] as string[],
    },
  };
}

function workErrorState(error: unknown): AdminFormState {
  const message = getSupabaseErrorMessage(
    error,
    "No se pudo guardar la obra.",
  );

  if (message.includes("works_slug_lower_uidx")) {
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

export async function createWork(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const { fieldErrors, payload } = parseWorkPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = getMutationClient();
    const { data, error } = await client
      .from("works")
      .insert(payload)
      .select("id, slug")
      .single();

    if (error) {
      return workErrorState(error);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/obras");
    revalidatePath("/obras");
    revalidatePath(`/obras/${data.slug}`);
    redirect(`/admin/obras/${data.id}?saved=1`);
  } catch (error) {
    return workErrorState(error);
  }
}

export async function updateWork(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const id = getString(formData, "id");

  if (!id) {
    return {
      error: "Falta el identificador de la obra.",
    };
  }

  const { fieldErrors, payload } = parseWorkPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = getMutationClient();
    const { data, error } = await client
      .from("works")
      .update(payload)
      .eq("id", id)
      .select("id, slug")
      .single();

    if (error) {
      return workErrorState(error);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/obras");
    revalidatePath("/obras");
    revalidatePath(`/obras/${data.slug}`);
    redirect(`/admin/obras/${data.id}?saved=1`);
  } catch (error) {
    return workErrorState(error);
  }
}
