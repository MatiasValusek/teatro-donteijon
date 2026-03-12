"use client";

import { useActionState } from "react";
import { AdminActions } from "@/components/admin/admin-actions";
import { AdminFormSection } from "@/components/admin/admin-form-section";
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

      <AdminFormNotice error={state.error} saved={saved} />

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
          />
          <AdminInputField
            name="role"
            label="Rol"
            defaultValue={member?.role}
            error={state.fieldErrors?.role}
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
        />

        <AdminInputField
          name="image_url"
          label="URL de imagen"
          type="url"
          defaultValue={member?.image_url}
          error={state.fieldErrors?.image_url}
        />
      </AdminFormSection>

      <AdminFormSection
        title="Configuracion"
        description="Orden manual y estado de publicacion del integrante."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="sort_order"
            label="sort_order"
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
