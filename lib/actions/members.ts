"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AdminFormState } from "./form-state";
import {
  ensureRequired,
  getBoolean,
  getInteger,
  getMutationClient,
  getString,
  getSupabaseErrorMessage,
  hasFieldErrors,
} from "./shared";

function parseMemberPayload(formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  const name = getString(formData, "name");
  const role = getString(formData, "role");
  const bio = getString(formData, "bio");
  const imageUrl = getString(formData, "image_url");
  const sortOrder = getInteger(formData, "sort_order", { min: 0, fallback: 0 });
  const isActive = getBoolean(formData, "is_active");

  ensureRequired(fieldErrors, "name", name);
  ensureRequired(fieldErrors, "role", role);
  ensureRequired(fieldErrors, "bio", bio);
  ensureRequired(fieldErrors, "image_url", imageUrl);

  if (sortOrder.error) {
    fieldErrors.sort_order = sortOrder.error;
  }

  return {
    fieldErrors,
    payload: {
      name,
      role,
      bio,
      image_url: imageUrl,
      sort_order: sortOrder.value,
      is_active: isActive,
    },
  };
}

function memberErrorState(error: unknown): AdminFormState {
  return {
    error: getSupabaseErrorMessage(error, "No se pudo guardar el integrante."),
  };
}

export async function createMember(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const { fieldErrors, payload } = parseMemberPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = getMutationClient();
    const { data, error } = await client
      .from("members")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return memberErrorState(error);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/integrantes");
    revalidatePath("/nosotros");
    redirect(`/admin/integrantes/${data.id}?saved=1`);
  } catch (error) {
    return memberErrorState(error);
  }
}

export async function updateMember(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const id = getString(formData, "id");

  if (!id) {
    return {
      error: "Falta el identificador del integrante.",
    };
  }

  const { fieldErrors, payload } = parseMemberPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = getMutationClient();
    const { data, error } = await client
      .from("members")
      .update(payload)
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      return memberErrorState(error);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/integrantes");
    revalidatePath("/nosotros");
    redirect(`/admin/integrantes/${data.id}?saved=1`);
  } catch (error) {
    return memberErrorState(error);
  }
}
