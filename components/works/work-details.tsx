import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import type { Work } from "@/types/content";

type WorkDetailsProps = {
  work: Work;
};

export function WorkDetails({ work }: WorkDetailsProps) {
  return (
    <section className="section-divider section-space">
      <Container className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div className="space-y-8">
          <Panel variant="soft" padding="lg">
            <p className="section-eyebrow">
              Sinopsis
            </p>
            <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
              {work.fullDescription}
            </p>
          </Panel>

          {work.artisticText ? (
            <Panel
              variant="strong"
              padding="lg"
              className="bg-[linear-gradient(145deg,rgba(244,92,44,0.12),rgba(12,12,12,0.96))]"
            >
              <p className="section-eyebrow">
                Texto artistico
              </p>
              <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
                {work.artisticText}
              </p>
            </Panel>
          ) : null}
        </div>

        <aside className="grid gap-4">
          <Panel className="rounded-[1.75rem]" variant="inset">
            <p className="section-eyebrow">
              Direccion
            </p>
            <p className="mt-3 text-xl text-white">{work.director}</p>
          </Panel>

          {work.cast.length > 0 ? (
            <Panel className="rounded-[1.75rem]" variant="inset">
              <p className="section-eyebrow">
                Elenco
              </p>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted">
                {work.cast.map((person) => (
                  <li key={person}>{person}</li>
                ))}
              </ul>
            </Panel>
          ) : null}

          {work.technicalSheet.length > 0 ? (
            <Panel className="rounded-[1.75rem]" variant="inset">
              <p className="section-eyebrow">
                Ficha tecnica
              </p>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted">
                {work.technicalSheet.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Panel>
          ) : null}
        </aside>
      </Container>
    </section>
  );
}
