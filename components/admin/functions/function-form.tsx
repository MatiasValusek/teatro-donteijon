"use client";

import { useActionState } from "react";
import { AdminActions } from "@/components/admin/admin-actions";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import {
  AdminCheckboxField,
  AdminFormNotice,
  AdminInputField,
  AdminSelectField,
} from "@/components/admin/form-fields";
import { toDateTimeLocalValue } from "@/components/admin/helpers";
import { initialAdminFormState } from "@/lib/actions/form-state";
import { createFunction, updateFunction } from "@/lib/actions/functions";
import type { AdminFunctionRow } from "@/lib/queries/admin";

type FunctionFormProps = {
  event?: AdminFunctionRow | null;
  works: Array<{
    id: string;
    title: string;
  }>;
  saved?: boolean;
};

export function FunctionForm({
  event,
  works,
  saved = false,
}: FunctionFormProps) {
  const action = event ? updateFunction : createFunction;
  const [state, formAction] = useActionState(action, initialAdminFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {event ? <input type="hidden" name="id" value={event.id} /> : null}

      <AdminFormNotice
        error={state.error}
        fieldErrors={state.fieldErrors}
        saved={saved}
        successMessage="Funcion guardada correctamente."
      />

      <AdminFormSection
        title="Obra y programacion"
        description="Relaciona la funcion con una obra existente y define fecha y hora."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminSelectField
            name="work_id"
            label="Obra"
            defaultValue={event?.work_id ?? works[0]?.id}
            options={works.map((work) => ({
              value: work.id,
              label: work.title,
            }))}
            error={state.fieldErrors?.work_id}
            required
          />
          <AdminInputField
            name="starts_at"
            label="Fecha y hora"
            type="datetime-local"
            defaultValue={toDateTimeLocalValue(event?.starts_at)}
            error={state.fieldErrors?.starts_at}
            required
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Lugar"
        description="Informacion visible en la agenda publica."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="venue_name"
            label="Venue / sala"
            defaultValue={event?.venue_name}
            error={state.fieldErrors?.venue_name}
            required
          />
          <AdminInputField
            name="venue_address"
            label="Direccion"
            defaultValue={event?.venue_address}
            error={state.fieldErrors?.venue_address}
            required
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Reserva y estado"
        description="Datos operativos de reserva y publicacion."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="reservation_url"
            label="URL de reservas"
            type="url"
            defaultValue={event?.reservation_url ?? ""}
            hint="Opcional. Si queda vacio, la funcion se publica sin enlace externo de reserva."
            error={state.fieldErrors?.reservation_url}
          />
          <AdminInputField
            name="ticket_price_text"
            label="Precio"
            defaultValue={event?.ticket_price_text ?? ""}
            hint="Opcional"
          />
        </div>

        <AdminCheckboxField
          name="is_active"
          label="Funcion activa"
          hint="Si esta desmarcada, no se muestra en la agenda publica."
          defaultChecked={event?.is_active ?? true}
        />
      </AdminFormSection>

      <AdminActions
        cancelHref="/admin/funciones"
        submitLabel={event ? "Guardar cambios" : "Crear funcion"}
      />
    </form>
  );
}
