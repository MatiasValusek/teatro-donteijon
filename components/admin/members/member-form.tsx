"use client";

import { useActionState } from "react";
import { AdminActions } from "@/components/admin/admin-actions";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { ImageUploadField } from "@/components/admin/media/image-upload-field";
import {
  AdminCheckboxField,
  AdminFormNotice,
  AdminInputField,
  AdminTextareaField,
} from "@/components/admin/form-fields";
import { initialAdminFormState } from "@/lib/actions/form-state";
import { createMember, updateMember } from "@/lib/actions/members";
import type { AdminMemberRow } from "@/lib/queries/admin";

type MemberFormProps = {
  member?: AdminMemberRow | null;
  saved?: boolean;
};

export function MemberForm({ member, saved = false }: MemberFormProps) {
  const action = member ? updateMember : createMember;
  const [state, formAction] = useActionState(action, initialAdminFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {member ? <input type="hidden" name="id" value={member.id} /> : null}

      <AdminFormNotice
        error={state.error}
        fieldErrors={state.fieldErrors}
        saved={saved}
        successMessage="Integrante guardado correctamente."
      />

      <AdminFormSection
        title="Informacion principal"
        description="Datos base para identificar al integrante dentro del grupo."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="name"
            label="Nombre"
            defaultValue={member?.name}
            error={state.fieldErrors?.name}
            required
          />
          <AdminInputField
            name="role"
            label="Rol"
            defaultValue={member?.role}
            error={state.fieldErrors?.role}
            required
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Contenido"
        description="Descripcion breve que luego aparece en la pagina Nosotros."
      >
        <AdminTextareaField
          name="bio"
          label="Bio"
          rows={8}
          defaultValue={member?.bio}
          error={state.fieldErrors?.bio}
          required
        />

        <ImageUploadField
          name="image_url"
          label="Imagen del integrante"
          folder="members"
          defaultValue={member?.image_url}
          error={state.fieldErrors?.image_url}
          required
          previewAlt={member?.name ? `Retrato de ${member.name}` : "Imagen del integrante"}
          hint="Ideal para retratos o fotos de perfil del elenco y del equipo."
        />
      </AdminFormSection>

      <AdminFormSection
        title="Configuracion"
        description="Orden manual y estado de publicacion del integrante."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="sort_order"
            label="Orden"
            type="number"
            min={0}
            defaultValue={member?.sort_order ?? 0}
            error={state.fieldErrors?.sort_order}
          />
        </div>

        <AdminCheckboxField
          name="is_active"
          label="Integrante activo"
          hint="Si esta desmarcado, deja de mostrarse en la pagina publica."
          defaultChecked={member?.is_active ?? true}
        />
      </AdminFormSection>

      <AdminActions
        cancelHref="/admin/integrantes"
        submitLabel={member ? "Guardar cambios" : "Crear integrante"}
      />
    </form>
  );
}
