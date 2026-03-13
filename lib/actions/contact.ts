"use server";

import { revalidatePath } from "next/cache";
import type { PublicFormState } from "@/lib/actions/public-form-state";
import {
  ensureEmail,
  ensureRequired,
  getPublicMutationClient,
  getString,
  hasFieldErrors,
} from "@/lib/actions/shared";

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

  if (!getPublicMutationClient()) {
    return {
      status: "error",
      message:
        "Supabase no esta disponible en este entorno. Revisa la configuracion antes de usar el formulario.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/contacto");

  return {
    status: "error",
    message:
      "El formulario de contacto todavia no esta habilitado en el esquema actual de la base.",
  };
}
