"use client";

import { useActionState } from "react";
import { saveGroupInfo } from "@/lib/actions/group";
import { initialAdminFormState } from "@/lib/actions/form-state";
import type { AdminGroupInfoRow } from "@/lib/queries/admin";
import { AdminActions } from "./admin-actions";
import { AdminFormSection } from "./admin-form-section";
import {
  AdminFormNotice,
  AdminInputField,
  AdminTextareaField,
} from "./form-fields";
import { toTextareaValue } from "./helpers";

type GroupFormProps = {
  group?: AdminGroupInfoRow | null;
  saved?: boolean;
};

export function GroupForm({ group, saved = false }: GroupFormProps) {
  const [state, formAction] = useActionState(saveGroupInfo, initialAdminFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {group ? <input type="hidden" name="id" value={group.id} /> : null}

      <AdminFormNotice error={state.error} saved={saved} />

      <AdminFormSection
        title="Identidad"
        description="Datos globales del grupo para la pagina /nosotros y contacto."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="name"
            label="Nombre"
            defaultValue={group?.name}
            error={state.fieldErrors?.name}
          />
          <AdminInputField
            name="short_name"
            label="Nombre corto"
            defaultValue={group?.short_name}
            error={state.fieldErrors?.short_name}
          />
        </div>

        <AdminInputField
          name="subtitle"
          label="Subtitulo"
          defaultValue={group?.subtitle}
          error={state.fieldErrors?.subtitle}
        />
      </AdminFormSection>

      <AdminFormSection
        title="Contenido institucional"
        description="Textos base que construyen la narrativa publica del grupo."
      >
        <AdminTextareaField
          name="highlighted_quote"
          label="Cita destacada"
          rows={3}
          defaultValue={group?.highlighted_quote}
          error={state.fieldErrors?.highlighted_quote}
        />
        <AdminTextareaField
          name="history"
          label="Historia"
          rows={8}
          defaultValue={toTextareaValue(group?.history)}
          error={state.fieldErrors?.history}
          hint="Una idea o parrafo por linea."
        />

        <AdminTextareaField
          name="manifesto"
          label="Manifiesto"
          rows={8}
          defaultValue={toTextareaValue(group?.manifesto)}
          error={state.fieldErrors?.manifesto}
          hint="Una idea o parrafo por linea."
        />
      </AdminFormSection>

      <AdminFormSection
        title="Imagen principal"
        description="Visual principal utilizado en la presentacion institucional."
      >
        <AdminInputField
          name="hero_image_url"
          label="URL imagen hero"
          type="url"
          defaultValue={group?.hero_image_url}
          error={state.fieldErrors?.hero_image_url}
        />
      </AdminFormSection>

      <AdminFormSection
        title="Contacto"
        description="Canales principales para consultas generales, prensa y redes."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="contact_email"
            label="Email principal"
            type="email"
            defaultValue={group?.contact_email}
            error={state.fieldErrors?.contact_email}
          />
          <AdminInputField
            name="press_email"
            label="Email de prensa"
            type="email"
            defaultValue={group?.press_email ?? ""}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="instagram_url"
            label="Instagram"
            type="url"
            defaultValue={group?.instagram_url}
            error={state.fieldErrors?.instagram_url}
          />
          <AdminInputField
            name="phone"
            label="Telefono"
            defaultValue={group?.phone ?? ""}
          />
        </div>

        <AdminInputField
          name="city"
          label="Ciudad"
          defaultValue={group?.city}
          error={state.fieldErrors?.city}
        />
      </AdminFormSection>

      <AdminActions cancelHref="/admin/obras" submitLabel="Guardar grupo" />
    </form>
  );
}
