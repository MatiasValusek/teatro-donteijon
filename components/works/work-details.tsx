import { Container } from "@/components/ui/container";
import type { Work } from "@/types/content";

type WorkDetailsProps = {
  work: Work;
};

export function WorkDetails({ work }: WorkDetailsProps) {
  return (
    <section className="section-divider py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
              Sinopsis
            </p>
            <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
              {work.fullDescription}
            </p>
          </div>

          {work.artisticText ? (
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(244,92,44,0.12),rgba(12,12,12,0.96))] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
                Texto artistico
              </p>
              <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
                {work.artisticText}
              </p>
            </div>
          ) : null}
        </div>

        <aside className="grid gap-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
              Direccion
            </p>
            <p className="mt-3 text-xl text-white">{work.director}</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
              Elenco
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted">
              {work.cast.map((person) => (
                <li key={person}>{person}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
              Ficha tecnica
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted">
              {work.technicalSheet.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
