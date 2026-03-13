"use server";

import { revalidatePath } from "next/cache";
import type { PublicFormState } from "@/lib/actions/public-form-state";
import {
  ensureEmail,
  ensureRequired,
  getPublicMutationClient,
  getString,
  getSupabaseErrorMessage,
  hasFieldErrors,
} from "@/lib/actions/shared";

function contactErrorState(error: unknown): PublicFormState {
  return {
    status: "error",
    message: getSupabaseErrorMessage(
      error,
      "No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.",
    ),
  };
}

export async function createContactMessage(
  _previousState: PublicFormState,
  formData: FormData,
): Promise<PublicFormState> {
  const fieldErrors: Record<string, string> = {};
  const fullName = getString(formData, "full_name");
  const email = getString(formData, "email");
  const subject = getString(formData, "subject");
  const message = getString(formData, "message");

  ensureRequired(fieldErrors, "full_name", fullName);
  ensureEmail(fieldErrors, "email", email);
  ensureRequired(fieldErrors, "subject", subject);
  ensureRequired(fieldErrors, "message", message);

  if (hasFieldErrors(fieldErrors)) {
    return {
      status: "error",
      fieldErrors,
    };
  }

  const client = getPublicMutationClient();

  if (!client) {
    return {
      status: "error",
      message:
        "Supabase no esta disponible en este entorno. Revisa la configuracion antes de usar el formulario.",
    };
  }

  try {
    const { error } = await client.from("contact_messages").insert({
      full_name: fullName,
      email,
      subject,
      message,
    });

    if (error) {
      return contactErrorState(error);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/contacto");

    return {
      status: "success",
      message: "Recibimos tu mensaje. Gracias por comunicarte con VdN.",
    };
  } catch (error) {
    return contactErrorState(error);
  }
}
