"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AdminFormState } from "./form-state";
import {
  ensureRequired,
  getBoolean,
  getMutationClient,
  getOptionalString,
  getRequiredDateTimeIso,
  getString,
  getSupabaseErrorMessage,
  hasFieldErrors,
} from "./shared";

type MutationClient = Awaited<ReturnType<typeof getMutationClient>>;

async function getWorkSlug(
  client: MutationClient,
  workId: string,
) {
  const { data } = await client
    .from("works")
    .select("slug")
    .eq("id", workId)
    .maybeSingle();

  return data?.slug ?? null;
}

async function getFunctionWorkId(
  client: MutationClient,
  id: string,
) {
  const { data } = await client
    .from("functions")
    .select("work_id")
    .eq("id", id)
    .maybeSingle();

  return data?.work_id ?? null;
}

function functionErrorState(error: unknown): AdminFormState {
  return {
    error: getSupabaseErrorMessage(error, "No se pudo guardar la funcion."),
  };
}

function parseFunctionPayload(formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  const workId = getString(formData, "work_id");
  const venueName = getString(formData, "venue_name");
  const venueAddress = getString(formData, "venue_address");
  const reservationUrl = getOptionalString(formData, "reservation_url");
  const ticketPriceText = getOptionalString(formData, "ticket_price_text");
  const startsAt = getRequiredDateTimeIso(formData, "starts_at");
  const isActive = getBoolean(formData, "is_active");

  ensureRequired(fieldErrors, "work_id", workId);
  ensureRequired(fieldErrors, "venue_name", venueName);
  ensureRequired(fieldErrors, "venue_address", venueAddress);

  if (startsAt.error) {
    fieldErrors.starts_at = startsAt.error;
  }

  const startsAtValue = startsAt.value ?? "";

  return {
    fieldErrors,
    workId,
    payload: {
      work_id: workId,
      starts_at: startsAtValue,
      venue_name: venueName,
      venue_address: venueAddress,
      reservation_url: reservationUrl,
      ticket_price_text: ticketPriceText,
      is_active: isActive,
    },
  };
}

export async function createFunction(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const { fieldErrors, workId, payload } = parseFunctionPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = await getMutationClient();
    const { data, error } = await client
      .from("functions")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return functionErrorState(error);
    }

    const workSlug = await getWorkSlug(client, workId);

    revalidatePath("/admin");
    revalidatePath("/admin/funciones");
    revalidatePath("/funciones");

    if (workSlug) {
      revalidatePath(`/obras/${workSlug}`);
    }

    redirect(`/admin/funciones/${data.id}?saved=1`);
  } catch (error) {
    return functionErrorState(error);
  }
}

export async function updateFunction(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const id = getString(formData, "id");

  if (!id) {
    return {
      error: "Falta el identificador de la funcion.",
    };
  }

  const { fieldErrors, workId, payload } = parseFunctionPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = await getMutationClient();
    const previousWorkId = await getFunctionWorkId(client, id);
    const { data, error } = await client
      .from("functions")
      .update(payload)
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      return functionErrorState(error);
    }

    if (!data) {
      return {
        error: "La funcion que intentaste editar ya no existe.",
      };
    }

    const relatedWorkIds = [...new Set([previousWorkId, workId])].filter(
      (relatedWorkId): relatedWorkId is string => Boolean(relatedWorkId),
    );
    const workSlugs = await Promise.all(
      relatedWorkIds.map((relatedWorkId) => getWorkSlug(client, relatedWorkId)),
    );

    revalidatePath("/admin");
    revalidatePath("/admin/funciones");
    revalidatePath("/funciones");

    workSlugs.filter(Boolean).forEach((workSlug) => {
      revalidatePath(`/obras/${workSlug}`);
    });

    redirect(`/admin/funciones/${data.id}?saved=1`);
  } catch (error) {
    return functionErrorState(error);
  }
}
