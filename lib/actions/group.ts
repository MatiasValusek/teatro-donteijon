"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AdminFormState } from "./form-state";
import {
  ensureRequired,
  getList,
  getMutationClient,
  getOptionalString,
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
  const heroImageUrl = getString(formData, "hero_image_url");
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
    const client = getMutationClient();
    const existingGroupQuery = requestedId
      ? client
          .from("group_info")
          .select(
            "id, focus_areas, manifesto_pillars, history_image_url, history_image_alt",
          )
          .eq("id", requestedId)
          .maybeSingle()
      : client
          .from("group_info")
          .select(
            "id, focus_areas, manifesto_pillars, history_image_url, history_image_alt",
          )
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle();

    const { data: existingGroup, error: existingGroupError } =
      await existingGroupQuery;

    if (existingGroupError) {
      return groupErrorState(existingGroupError);
    }

    const mutationPayload = {
      ...payload,
      hero_image_alt: `Escena grupal de ${payload.name || "Vamos de Nuevo"}`,
      history_image_url: payload.hero_image_url,
      history_image_alt:
        existingGroup?.history_image_alt ??
        `Proceso de ensayo de ${payload.name || "Vamos de Nuevo"}`,
      focus_areas: existingGroup?.focus_areas ?? [],
      manifesto_pillars: existingGroup?.manifesto_pillars ?? [],
    };

    if (existingGroup?.id) {
      const { error } = await client
        .from("group_info")
        .update(mutationPayload)
        .eq("id", existingGroup.id);

      if (error) {
        return groupErrorState(error);
      }
    } else {
      const { error } = await client.from("group_info").insert(mutationPayload);

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
