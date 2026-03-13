import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { ButtonLink } from "@/components/ui/button-link";
import { Panel } from "@/components/ui/panel";

export default function AdminNotFound() {
  return (
    <>
      <AdminPageTitle
        title="Contenido no encontrado"
        description="El recurso que intentaste abrir no existe o ya no esta disponible en el panel."
      />

      <Panel variant="soft" padding="lg" className="border-dashed border-white/15">
        <p className="max-w-2xl text-sm leading-7 text-muted">
          Revisa el enlace o vuelve al listado correspondiente para seguir
          trabajando.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/admin" size="md">
            Volver al dashboard
          </ButtonLink>
          <ButtonLink href="/" variant="secondary" size="md">
            Ver sitio
          </ButtonLink>
        </div>
      </Panel>
    </>
  );
}
