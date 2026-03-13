import type { Metadata } from "next";
import { FunctionsHeader } from "@/components/functions/functions-header";
import { FunctionsList } from "@/components/functions/functions-list";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { getUpcomingFunctions } from "@/lib/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Funciones",
  description:
    "Agenda de funciones de Vamos de Nuevo con fechas, salas y enlaces de reserva para seguir el recorrido del grupo.",
  path: "/funciones",
});

export default async function FuncionesPage() {
  const upcomingItems = await getUpcomingFunctions();

  const filterWorks = Array.from(
    new Map(
      upcomingItems.map((item) => [
        item.work.id,
        {
          id: item.work.id,
          title: item.work.title,
        },
      ]),
    ).values(),
  ).sort((left, right) => left.title.localeCompare(right.title));

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
