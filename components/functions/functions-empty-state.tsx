import { ButtonLink } from "@/components/ui/button-link";

type FunctionsEmptyStateProps = {
  hasFilter: boolean;
};

export function FunctionsEmptyState({
  hasFilter,
}: FunctionsEmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-6 sm:p-8">
      <h3 className="text-3xl leading-none text-white">
        No hay funciones programadas en este momento.
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        {hasFilter
          ? "No encontramos fechas visibles para la obra seleccionada. Puedes limpiar el filtro o explorar el resto del repertorio."
          : "Cuando la agenda se actualice, esta pagina ya esta preparada para mostrar nuevas fechas de forma cronologica y clara."}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/obras" variant="secondary" size="md">
          Explorar obras
        </ButtonLink>
        <ButtonLink href="/contacto" size="md">
          Contactar al grupo
        </ButtonLink>
      </div>
    </div>
  );
}
