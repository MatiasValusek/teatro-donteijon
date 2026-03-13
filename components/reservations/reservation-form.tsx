"use client";

import { useActionState, useEffect, useRef } from "react";
import { createReservation } from "@/lib/actions/reservations";
import {
  initialPublicFormState,
  type PublicFormState,
} from "@/lib/actions/public-form-state";
import type { ReservationFunctionSummary } from "@/types/inbox";
import {
  PublicFormNotice,
  PublicInputField,
  PublicTextareaField,
} from "@/components/forms/public-form-fields";

type ReservationFormProps = {
  item: ReservationFunctionSummary;
};

export function ReservationForm({ item }: ReservationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState<PublicFormState, FormData>(
    createReservation,
    initialPublicFormState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
        Datos de reserva
      </p>
      <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
        Envia tu consulta.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        La reserva queda registrada en el panel interno del grupo. Luego VdN
        puede responder y confirmar por mail, telefono o mensaje directo.
      </p>

      <form ref={formRef} action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="function_id" value={item.id} />

        <PublicFormNotice status={state.status} message={state.message} />

        <div className="grid gap-5 sm:grid-cols-2">
          <PublicInputField
            name="full_name"
            label="Nombre y apellido"
            placeholder="Tu nombre completo"
            error={state.fieldErrors?.full_name}
          />
          <PublicInputField
            name="email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={state.fieldErrors?.email}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <PublicInputField
            name="phone"
            label="Telefono"
            type="tel"
            placeholder="11 5555 5555"
            error={state.fieldErrors?.phone}
          />
          <PublicInputField
            name="quantity"
            label="Cantidad de entradas"
            type="number"
            min={1}
            defaultValue={1}
            error={state.fieldErrors?.quantity}
          />
        </div>

        <PublicTextareaField
          name="message"
          label="Mensaje"
          rows={5}
          placeholder="Si quieres, puedes sumar aclaraciones sobre la reserva."
          hint="Opcional"
          error={state.fieldErrors?.message}
        />

        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-sm leading-7 text-muted">
            La web registra la solicitud, pero la confirmacion final sigue siendo
            manual. Si necesitas una respuesta urgente, tambien puedes escribir
            por los canales generales del grupo.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-6 text-base font-semibold text-zinc-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isPending ? "Enviando..." : "Enviar reserva"}
        </button>
      </form>
    </div>
  );
}
