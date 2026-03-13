import { FunctionEventCard } from "@/components/functions/function-event-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import type { FunctionEvent, Work } from "@/types/content";

type WorkFunctionsProps = {
  work: Work;
  events: FunctionEvent[];
};

export function WorkFunctions({ work, events }: WorkFunctionsProps) {
  return (
    <section className="section-divider section-space">
      <Container>
        <SectionHeader
          eyebrow="Funciones"
          title={`Proximas funciones de ${work.title}.`}
          description="La agenda de cada obra conserva el mismo sistema visual que la cartelera general para que la navegacion se sienta continua."
        />

        <div className="mt-8">
          {events.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {events.map((event) => (
                <FunctionEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Actualmente esta obra no tiene funciones programadas."
              description="Cuando haya nuevas fechas activas para esta obra, apareceran automaticamente en esta seccion sin cambiar la estructura de la ficha."
              action={
                <ButtonLink href="/funciones" variant="secondary" size="md">
                  Ver funciones generales
                </ButtonLink>
              }
            />
          )}
        </div>
      </Container>
    </section>
  );
}
