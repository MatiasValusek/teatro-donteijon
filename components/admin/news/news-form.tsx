"use client";

import { useActionState } from "react";
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
import { toDateTimeLocalValue } from "@/components/admin/helpers";
import { initialAdminFormState } from "@/lib/actions/form-state";
import { createNewsPost, updateNewsPost } from "@/lib/actions/news";
import type { AdminNewsPostRow } from "@/lib/queries/admin";

type NewsFormProps = {
  post?: AdminNewsPostRow | null;
  saved?: boolean;
};

export function NewsForm({ post, saved = false }: NewsFormProps) {
  const action = post ? updateNewsPost : createNewsPost;
  const [state, formAction] = useActionState(action, initialAdminFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <AdminFormNotice error={state.error} saved={saved} />

      <AdminFormSection
        title="Informacion principal"
        description="Datos editoriales base para identificar la publicacion."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminInputField
            name="title"
            label="Titulo"
            defaultValue={post?.title}
            error={state.fieldErrors?.title}
          />
          <AdminInputField
            name="slug"
            label="Slug"
            defaultValue={post?.slug}
            hint="Se normaliza automaticamente a minusculas y guiones."
            error={state.fieldErrors?.slug}
          />
        </div>

        <AdminSelectField
          name="category"
          label="Categoria"
          defaultValue={post?.category ?? "anuncio"}
          options={[
            { value: "anuncio", label: "Anuncio" },
            { value: "estreno", label: "Estreno" },
            { value: "festival", label: "Festival" },
            { value: "prensa", label: "Prensa" },
            { value: "taller", label: "Taller" },
          ]}
          error={state.fieldErrors?.category}
        />
      </AdminFormSection>

      <AdminFormSection
        title="Contenido"
        description="Texto plano del contenido editorial."
      >
        <AdminTextareaField
          name="excerpt"
          label="Resumen"
          rows={4}
          defaultValue={post?.excerpt}
          error={state.fieldErrors?.excerpt}
        />

        <AdminTextareaField
          name="content"
          label="Contenido"
          rows={14}
          defaultValue={post?.content}
          error={state.fieldErrors?.content}
        />

        <ImageUploadField
          name="cover_image_url"
          label="Imagen de portada"
          folder="news"
          defaultValue={post?.cover_image_url}
          error={state.fieldErrors?.cover_image_url}
          previewAlt={post?.title ? `Portada de ${post.title}` : "Portada de la novedad"}
          hint="Sube la portada editorial o conserva el valor actual si todavia no hace falta reemplazarlo."
        />
      </AdminFormSection>

      <AdminFormSection
        title="Publicacion"
        description="Estado editorial, destacada y fecha de publicacion."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminInputField
            name="published_at"
            label="Fecha de publicacion"
            type="datetime-local"
            defaultValue={toDateTimeLocalValue(post?.published_at)}
            error={state.fieldErrors?.published_at}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminCheckboxField
            name="featured"
            label="Destacada"
            hint="Da prioridad visual a esta novedad."
            defaultChecked={post?.featured}
          />
          <AdminCheckboxField
            name="is_published"
            label="Publicada"
            hint="Si esta desmarcada, queda como borrador interno."
            defaultChecked={post?.is_published}
          />
        </div>
      </AdminFormSection>

      <AdminActions
        cancelHref="/admin/novedades"
        submitLabel={post ? "Guardar cambios" : "Crear novedad"}
      />
    </form>
  );
}
