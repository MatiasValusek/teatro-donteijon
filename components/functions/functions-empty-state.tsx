import { ButtonLink } from "@/components/ui/button-link";
import { EmptyState } from "@/components/ui/empty-state";

type FunctionsEmptyStateProps = {
  hasFilter: boolean;
};

export function FunctionsEmptyState({
  hasFilter,
}: FunctionsEmptyStateProps) {
  return (
    <EmptyState
      title="No hay funciones programadas en este momento."
      description={
        hasFilter
          ? "No encontramos fechas visibles para la obra seleccionada. Puedes limpiar el filtro o explorar el resto del repertorio."
          : "Cuando haya nuevas fechas activas, la agenda las va a mostrar automaticamente en orden cronologico."
      }
      action={
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/obras" variant="secondary" size="md">
            Explorar obras
          </ButtonLink>
          <ButtonLink href="/contacto" size="md">
            Contactar al grupo
          </ButtonLink>
        </div>
      }
    />
  );
}
