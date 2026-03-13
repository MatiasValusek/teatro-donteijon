"use client";

import { useActionState } from "react";
import { initialAdminFormState } from "@/lib/actions/form-state";
import { createWork, updateWork } from "@/lib/actions/works";
import type { AdminWorkRow } from "@/lib/queries/admin";
import { AdminActions } from "@/components/admin/admin-actions";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { ImageUploadField } from "@/components/admin/media/image-upload-field";
import {
  AdminCheckboxField,
  AdminFormNotice,
  AdminInputField,
  AdminSelectField,
  AdminTextareaField,
} from "@/components/admin/form-fields";
import { toCommaSeparatedValue } from "@/components/admin/helpers";

type WorkFormProps = {
  work?: AdminWorkRow | null;
  saved?: boolean;
};

export function WorkForm({ work, saved = false }: WorkFormProps) {
  const action = work ? updateWork : createWork;
  const [state, formAction] = useActionState(action, initialAdminFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {work ? <input type="hidden" name="id" value={work.id} /> : null}

      <AdminFormNotice error={state.error} saved={saved} />

      <AdminFormSection
        title="Informacion principal"
        description="Datos base de identificacion y lectura rapida."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminInputField
            name="title"
            label="Titulo"
            defaultValue={work?.title}
            error={state.fieldErrors?.title}
          />
          <AdminInputField
            name="slug"
            label="Slug"
            defaultValue={work?.slug}
            hint="Se normaliza automaticamente a minusculas y guiones."
            error={state.fieldErrors?.slug}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <AdminInputField
            name="genre"
            label="Genero"
            defaultValue={work?.genre}
            error={state.fieldErrors?.genre}
          />
          <AdminInputField
            name="director"
            label="Direccion"
            defaultValue={work?.director}
            error={state.fieldErrors?.director}
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Contenido"
        description="Textos publicos de la ficha."
      >
        <AdminTextareaField
          name="short_description"
          label="Descripcion corta"
          rows={4}
          defaultValue={work?.short_description}
          error={state.fieldErrors?.short_description}
        />

        <AdminTextareaField
          name="full_description"
          label="Descripcion completa"
          rows={9}
          defaultValue={work?.full_description}
          error={state.fieldErrors?.full_description}
        />

        <AdminTextareaField
          name="cast"
          label="Elenco"
          rows={4}
          defaultValue={toCommaSeparatedValue(work?.cast)}
          hint="Ingresa los nombres separados por coma."
        />
      </AdminFormSection>

      <AdminFormSection
        title="Configuracion"
        description="Estado editorial, portada y orden manual."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <AdminInputField
            name="duration_minutes"
            label="Duracion (min)"
            type="number"
            min={1}
            defaultValue={work?.duration_minutes}
            error={state.fieldErrors?.duration_minutes}
          />
          <AdminSelectField
            name="status"
            label="Estado"
            defaultValue={work?.status ?? "active"}
            options={[
              { value: "active", label: "En cartel" },
              { value: "archive", label: "Archivo" },
            ]}
            error={state.fieldErrors?.status}
          />
          <AdminInputField
            name="sort_order"
            label="Orden"
            type="number"
            min={0}
            defaultValue={work?.sort_order ?? 0}
            error={state.fieldErrors?.sort_order}
          />
        </div>

        <ImageUploadField
          name="cover_image_url"
          label="Imagen de portada"
          folder="works"
          defaultValue={work?.cover_image_url}
          error={state.fieldErrors?.cover_image_url}
          previewAlt={work?.title ? `Portada de ${work.title}` : "Portada de la obra"}
          hint="Sube la portada principal de la obra. Si ya tenes una URL o path cargado, tambien puedes mantenerlo."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <AdminCheckboxField
            name="featured"
            label="Destacada"
            hint="Marca la obra para darle prioridad visual."
            defaultChecked={work?.featured}
          />
          <AdminCheckboxField
            name="is_published"
            label="Publicada"
            hint="Si esta desmarcada, queda como borrador interno."
            defaultChecked={work?.is_published}
          />
        </div>
      </AdminFormSection>

      <AdminActions
        cancelHref="/admin/obras"
        submitLabel={work ? "Guardar cambios" : "Crear obra"}
      />
    </form>
  );
}
