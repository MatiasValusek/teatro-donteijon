import { Container } from "@/components/ui/container";

type FunctionsHeaderProps = {
  totalEvents: number;
  totalWorks: number;
};

export function FunctionsHeader({
  totalEvents,
  totalWorks,
}: FunctionsHeaderProps) {
  return (
    <section className="pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pb-12 lg:pt-20">
      <Container>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            Agenda general
          </p>
          <h1 className="mt-5 text-[3rem] leading-[0.92] text-white sm:text-[4.2rem] lg:text-[5rem]">
            Funciones
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Consulta las proximas fechas, espacios y horarios de las obras de
            Vamos de Nuevo.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:max-w-md sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-2xl font-semibold text-white">{totalEvents}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
              Funciones visibles
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-2xl font-semibold text-white">{totalWorks}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
              Obras activas
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
