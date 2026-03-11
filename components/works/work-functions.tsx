import { FunctionEventCard } from "@/components/functions/function-event-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import type { FunctionEvent, Work } from "@/types/content";

type WorkFunctionsProps = {
  work: Work;
  events: FunctionEvent[];
};

export function WorkFunctions({ work, events }: WorkFunctionsProps) {
  return (
    <section className="section-divider py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
            Funciones
          </p>
          <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
            Proximas funciones de {work.title}.
          </h2>
        </div>

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
              description="La estructura ya contempla la relacion uno a muchos entre obra y funciones. Cuando conectemos Supabase, esta seccion podra reflejar agenda real sin cambiar la UI."
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
