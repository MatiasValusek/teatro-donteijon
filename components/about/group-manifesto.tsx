import { Container } from "@/components/ui/container";
import type { GroupInfo } from "@/types/about";

type GroupManifestoProps = {
  group: GroupInfo;
};

export function GroupManifesto({ group }: GroupManifestoProps) {
  return (
    <section className="section-divider section-space">
      <Container>
        <div className="grain-mask overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(138,30,44,0.3),rgba(11,11,11,0.96))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:gap-10">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
                  Mirada artistica
                </p>
                <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-[3.8rem]">
                  El teatro como una pregunta en movimiento.
                </h2>
              </div>

              <blockquote className="border-l border-orange-300/30 pl-5 text-3xl leading-tight text-white sm:text-[2.8rem]">
                {group.highlightedQuote}
              </blockquote>

              <div className="flex flex-wrap gap-2">
                {group.manifestoPillars.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.3em] text-orange-100/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5 sm:p-6 lg:p-8">
              <div className="space-y-5">
                {group.manifesto.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-muted-strong sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
