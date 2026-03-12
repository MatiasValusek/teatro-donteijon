import { FunctionsHeader } from "@/components/functions/functions-header";
import { FunctionsList } from "@/components/functions/functions-list";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { getPublishedWorks, getUpcomingFunctions } from "@/lib/queries";

export default async function FuncionesPage() {
  const [upcomingItems, works] = await Promise.all([
    getUpcomingFunctions(),
    getPublishedWorks(),
  ]);

  const filterWorks = works
    .filter((work) => work.status === "active")
    .map((work) => ({
    id: work.id,
    title: work.title,
    }));

  return (
    <>
      <FunctionsHeader
        totalEvents={upcomingItems.length}
        totalWorks={filterWorks.length}
      />

      <section className="section-divider section-space">
        <Container>
          <FunctionsList items={upcomingItems} works={filterWorks} />
        </Container>
      </section>

      <section className="section-divider section-space">
        <Container>
          <Panel variant="cta" padding="lg">
            <div className="grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="section-eyebrow">
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
          </Panel>
        </Container>
      </section>
    </>
  );
}
