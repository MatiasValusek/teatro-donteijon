import { FilterPill } from "@/components/functions/filter-pill";
import type { Work } from "@/types/content";

type FunctionsFiltersProps = {
  works: Array<Pick<Work, "id" | "title">>;
  selectedWorkId: Work["id"] | "all";
  onSelectWork: (workId: Work["id"] | "all") => void;
  onClear: () => void;
};

export function FunctionsFilters({
  works,
  selectedWorkId,
  onSelectWork,
  onClear,
}: FunctionsFiltersProps) {
  const hasActiveFilter = selectedWorkId !== "all";

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(12,12,12,0.96))] p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
            Filtro por obra
          </p>
          <p className="mt-2 text-sm leading-7 text-muted">
            Estructura visual lista para sumar mas filtros cuando conectemos la
            agenda real.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilter}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/8"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        <FilterPill
          label="Todas"
          active={selectedWorkId === "all"}
          onClick={() => onSelectWork("all")}
        />
        {works.map((work) => (
          <FilterPill
            key={work.id}
            label={work.title}
            active={selectedWorkId === work.id}
            onClick={() => onSelectWork(work.id)}
          />
        ))}
      </div>
    </div>
  );
}
