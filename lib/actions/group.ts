"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AdminFormState } from "./form-state";
import {
  ensureEmail,
  ensureOptionalEmail,
  ensureRequired,
  getList,
  getMutationClient,
  getOptionalString,
  getStoredImageValue,
  getString,
  getSupabaseErrorMessage,
  hasFieldErrors,
} from "./shared";

function parseGroupPayload(formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  const name = getString(formData, "name");
  const shortName = getString(formData, "short_name");
  const subtitle = getString(formData, "subtitle");
  const history = getList(formData, "history");
  const manifesto = getList(formData, "manifesto");
  const highlightedQuote = getString(formData, "highlighted_quote");
  const heroImageUrl = getStoredImageValue(formData, "hero_image_url");
  const contactEmail = getString(formData, "contact_email");
  const pressEmail = getOptionalString(formData, "press_email");
  const instagramUrl = getString(formData, "instagram_url");
  const phone = getOptionalString(formData, "phone");
  const city = getString(formData, "city");

  ensureRequired(fieldErrors, "name", name);
  ensureRequired(fieldErrors, "short_name", shortName);
  ensureRequired(fieldErrors, "subtitle", subtitle);
  if (history.length === 0) {
    fieldErrors.history = "Completa este campo.";
  }
  if (manifesto.length === 0) {
    fieldErrors.manifesto = "Completa este campo.";
  }
  ensureRequired(fieldErrors, "highlighted_quote", highlightedQuote);
  ensureRequired(fieldErrors, "hero_image_url", heroImageUrl);
  ensureRequired(fieldErrors, "contact_email", contactEmail);
  ensureRequired(fieldErrors, "instagram_url", instagramUrl);
  ensureRequired(fieldErrors, "city", city);
  ensureEmail(fieldErrors, "contact_email", contactEmail);
  ensureOptionalEmail(fieldErrors, "press_email", pressEmail);

  return {
    fieldErrors,
    payload: {
      name,
      short_name: shortName,
      subtitle,
      history,
      manifesto,
      highlighted_quote: highlightedQuote,
      hero_image_url: heroImageUrl,
      contact_email: contactEmail,
      press_email: pressEmail,
      instagram_url: instagramUrl,
      phone,
      city,
    },
  };
}

function groupErrorState(error: unknown): AdminFormState {
  return {
    error: getSupabaseErrorMessage(
      error,
      "No se pudieron guardar los datos del grupo.",
    ),
  };
}

export async function saveGroupInfo(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const requestedId = getString(formData, "id");
  const { fieldErrors, payload } = parseGroupPayload(formData);

  if (hasFieldErrors(fieldErrors)) {
    return { fieldErrors };
  }

  try {
    const client = await getMutationClient();
    const existingGroupQuery = requestedId
      ? client
          .from("group_info")
          .select("id")
          .eq("id", requestedId)
          .maybeSingle()
      : client
          .from("group_info")
          .select("id")
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle();

    const { data: existingGroup, error: existingGroupError } =
      await existingGroupQuery;

    if (existingGroupError) {
      return groupErrorState(existingGroupError);
    }

    if (requestedId && !existingGroup?.id) {
      return {
        error: "Los datos del grupo que intentaste editar ya no existen.",
      };
    }

    if (existingGroup?.id) {
      const { error } = await client
        .from("group_info")
        .update(payload)
        .eq("id", existingGroup.id);

      if (error) {
        return groupErrorState(error);
      }
    } else {
      const { error } = await client.from("group_info").insert(payload);

      if (error) {
        return groupErrorState(error);
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/grupo");
    revalidatePath("/nosotros");
    redirect("/admin/grupo?saved=1");
  } catch (error) {
    return groupErrorState(error);
  }
}
