import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { GroupInfo } from "@/types/about";

type AboutHeroProps = {
  group: GroupInfo;
};

export function AboutHero({ group }: AboutHeroProps) {
  return (
    <section className="page-hero-space-compact">
      <Container>
        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-black">
          <div className="absolute inset-0">
            <Image
              src={group.heroImage}
              alt={`Escena grupal de ${group.name}`}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 media-overlay-strong" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,150,82,0.22),transparent_28rem)]" />

          <div className="relative grid min-h-[30rem] content-end gap-8 p-6 sm:min-h-[34rem] sm:p-8 lg:min-h-[39rem] lg:grid-cols-[1.1fr,0.9fr] lg:items-end lg:p-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
                {group.shortName} / Teatro independiente
              </p>
              <h1 className="mt-5 text-balance text-[3.4rem] leading-[0.9] text-white sm:text-[4.6rem] lg:text-[5.8rem]">
                Nosotros
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-strong sm:text-lg">
                {group.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.focusAreas.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.28em] text-orange-100/90 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="max-w-sm rounded-[1.9rem] border border-white/10 bg-[linear-gradient(160deg,rgba(0,0,0,0.5),rgba(32,14,12,0.82))] p-5 backdrop-blur-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
                  Mirada de grupo
                </p>
                <blockquote className="mt-4 text-2xl leading-tight text-white sm:text-[2rem]">
                  {group.highlightedQuote}
                </blockquote>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Una practica artistica nacida del ensayo, la escena y el deseo
                  de que cada funcion siga vibrando despues del cierre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
