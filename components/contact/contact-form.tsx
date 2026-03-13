"use client";

import { useActionState, useEffect, useRef } from "react";
import { createContactMessage } from "@/lib/actions/contact";
import {
  initialPublicFormState,
  type PublicFormState,
} from "@/lib/actions/public-form-state";
import {
  PublicFormNotice,
  PublicInputField,
  PublicTextareaField,
} from "@/components/forms/public-form-fields";

type ContactFormProps = {
  fallbackEmail: string;
};

export function ContactForm({ fallbackEmail }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState<PublicFormState, FormData>(
    createContactMessage,
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
        Formulario de contacto
      </p>
      <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
        Dejanos un mensaje.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        El formulario ya registra consultas reales para prensa, talleres,
        propuestas y contacto institucional. Si prefieres escribir directo,
        tambien sigue disponible{" "}
        <a href={`mailto:${fallbackEmail}`} className="text-white underline-offset-4 hover:underline">
          {fallbackEmail}
        </a>
        .
      </p>

      <form ref={formRef} action={formAction} className="mt-8 space-y-5">
        <PublicFormNotice status={state.status} message={state.message} />

        <div className="grid gap-5 sm:grid-cols-2">
          <PublicInputField
            name="full_name"
            label="Nombre"
            placeholder="Tu nombre"
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

        <PublicInputField
          name="subject"
          label="Asunto"
          placeholder="Funciones, prensa, talleres o propuesta"
          error={state.fieldErrors?.subject}
        />

        <PublicTextareaField
          name="message"
          label="Mensaje"
          rows={6}
          placeholder="Contanos en que podemos ayudarte."
          error={state.fieldErrors?.message}
        />

        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-sm leading-7 text-muted">
            El mensaje se guarda en el panel interno de VdN para que el grupo
            pueda responder con seguimiento manual.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-6 text-base font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isPending ? "Enviando..." : "Enviar consulta"}
        </button>
      </form>
    </div>
  );
}
