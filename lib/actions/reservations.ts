"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ReservationStatus } from "@/types/inbox";
import type { PublicFormState } from "@/lib/actions/public-form-state";
import {
  ensureEmail,
  ensureRequired,
  getOptionalString,
  getPublicMutationClient,
  getRequiredInteger,
  getString,
  getSupabaseErrorMessage,
  hasFieldErrors,
} from "@/lib/actions/shared";

function reservationErrorState(error: unknown): PublicFormState {
  return {
    status: "error",
    message: getSupabaseErrorMessage(
      error,
      "No pudimos registrar la reserva. Intenta nuevamente en unos minutos.",
    ),
  };
}

function isReservationStatus(value: string): value is ReservationStatus {
  return value === "pending" || value === "confirmed" || value === "cancelled";
}

export async function createReservation(
  _previousState: PublicFormState,
  formData: FormData,
): Promise<PublicFormState> {
  const fieldErrors: Record<string, string> = {};
  const functionId = getString(formData, "function_id");
  const fullName = getString(formData, "full_name");
  const email = getString(formData, "email");
  const phone = getString(formData, "phone");
  const quantity = getRequiredInteger(formData, "quantity", { min: 1 });
  getOptionalString(formData, "message");

  ensureRequired(fieldErrors, "function_id", functionId);
  ensureRequired(fieldErrors, "full_name", fullName);
  ensureEmail(fieldErrors, "email", email);
  ensureRequired(fieldErrors, "phone", phone);

  if (quantity.error) {
    fieldErrors.quantity = quantity.error;
  }

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
        "Supabase no esta disponible en este entorno. Revisa la configuracion antes de tomar reservas.",
    };
  }

  try {
    const { data: functionRow, error: functionError } = await client
      .from("functions")
      .select("id, work_id, starts_at, reservation_url, is_active")
      .eq("id", functionId)
      .eq("is_active", true)
      .maybeSingle();

    if (functionError) {
      return reservationErrorState(functionError);
    }

    if (!functionRow) {
      return {
        status: "error",
        message: "La funcion seleccionada ya no esta disponible para reservar.",
      };
    }

    if (functionRow.reservation_url?.trim()) {
      return {
        status: "error",
        message:
          "Esta funcion utiliza un canal de reserva externo. Usa el enlace principal de la agenda.",
      };
    }

    if (new Date(functionRow.starts_at).getTime() < Date.now()) {
      return {
        status: "error",
        message: "La funcion seleccionada ya paso y no admite nuevas reservas.",
      };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/reservas");

    return {
      status: "error",
      message:
        "Las reservas internas todavia no estan habilitadas en el esquema actual de la base.",
    };
  } catch (error) {
    return reservationErrorState(error);
  }
}

export async function updateReservationStatus(formData: FormData) {
  const reservationId = getString(formData, "id");
  const status = getString(formData, "status");

  if (!reservationId || !isReservationStatus(status)) {
    redirect("/admin/reservas");
  }

  redirect("/admin/reservas?error=1");
}
