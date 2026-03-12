import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import type { ContactChannel } from "@/types/content";

type ContactTopicsProps = {
  topics: ContactChannel[];
};

export function ContactTopics({ topics }: ContactTopicsProps) {
  return (
    <SectionShell
      eyebrow="Consultas"
      title="Funciones, prensa y actividades en un mismo sistema claro."
      description="Un bloque simple para mostrar hacia donde puede ir cada consulta y dejar preparada la estructura de crecimiento del sitio."
    >
      <Container className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic) => (
          <article
            key={topic.title}
            className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(16,16,16,0.95))] p-5 sm:p-6"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-orange-200/75">
              {topic.label}
            </p>
            <h3 className="mt-3 text-3xl leading-none text-white">
              {topic.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {topic.description}
            </p>
          </article>
        ))}
      </Container>
    </SectionShell>
  );
}
