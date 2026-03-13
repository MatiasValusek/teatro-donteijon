import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { GroupInfo } from "@/types/about";

type GroupHistoryProps = {
  group: GroupInfo;
};

export function GroupHistory({ group }: GroupHistoryProps) {
  return (
    <section className="section-divider section-space">
      <Container className="grid gap-10 lg:grid-cols-[1.02fr,0.98fr] lg:items-start">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            Historia del grupo
          </p>
          <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-[3.8rem]">
            Un recorrido hecho de ensayo, comunidad y escena.
          </h2>

          <div className="mt-6 space-y-5">
            {group.history.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {group.milestones.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.05),rgba(12,12,12,0.95))] p-4 sm:p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200/75">
                  {item.label}
                </p>
                <h3 className="mt-3 text-2xl leading-none text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28">
          <div className="grain-mask overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(138,30,44,0.18),rgba(10,10,10,0.96))]">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src={group.historyImage}
                alt={`Proceso de ensayo de ${group.name}`}
                fill
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 44vw, calc(100vw - 2rem)"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.56))]" />
            </div>

            <div className="border-t border-white/10 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/75">
                Proceso abierto
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Cada obra se construye desde materiales vivos: notas, escenas en
                prueba, cuerpos disponibles y decisiones que aparecen al poner el
                trabajo en comun.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
