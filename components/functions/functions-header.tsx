import { PageHero } from "@/components/ui/page-hero";
import { Panel } from "@/components/ui/panel";

type FunctionsHeaderProps = {
  totalEvents: number;
  totalWorks: number;
};

export function FunctionsHeader({
  totalEvents,
  totalWorks,
}: FunctionsHeaderProps) {
  return (
    <PageHero
      eyebrow="Agenda general"
      title="Funciones"
      description="Consulta las proximas fechas, espacios y horarios de las obras de Vamos de Nuevo."
      aside={
        <div className="grid gap-3 sm:max-w-md sm:grid-cols-2">
          <Panel className="rounded-[1.5rem] px-5 py-4" padding="none">
            <p className="text-2xl font-semibold text-white">{totalEvents}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
              Funciones visibles
            </p>
          </Panel>
          <Panel className="rounded-[1.5rem] px-5 py-4" padding="none">
            <p className="text-2xl font-semibold text-white">{totalWorks}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
              Obras activas
            </p>
          </Panel>
        </div>
      }
    />
  );
}
