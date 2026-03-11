import { FunctionsHeader } from "@/components/functions/functions-header";
import { FunctionsList } from "@/components/functions/functions-list";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import {
  getActiveWorks,
  getUpcomingFunctionEventsWithWorks,
} from "@/lib/catalog";

export default function FuncionesPage() {
  const upcomingItems = getUpcomingFunctionEventsWithWorks();
  const filterWorks = getActiveWorks().map((work) => ({
    id: work.id,
    title: work.title,
  }));

  return (
    <>
      <FunctionsHeader
        totalEvents={upcomingItems.length}
        totalWorks={filterWorks.length}
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container>
          <FunctionsList items={upcomingItems} works={filterWorks} />
        </Container>
      </section>

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(161,28,33,0.22),rgba(12,12,12,0.96))] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
                  Siguiente paso
                </p>
                <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
                  Explora el repertorio o contacta al grupo para funciones,
                  programacion y nuevas fechas.
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink href="/obras" variant="secondary">
                  Ver obras
                </ButtonLink>
                <ButtonLink href="/contacto">Contactar al grupo</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
