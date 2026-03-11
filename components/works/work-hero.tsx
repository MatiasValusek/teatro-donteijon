import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { workStatusLabel } from "@/lib/theme";
import type { Work } from "@/types/content";

type WorkHeroProps = {
  work: Work;
};

export function WorkHero({ work }: WorkHeroProps) {
  return (
    <section className="pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pb-12 lg:pt-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
            <Image
              src={work.coverImage}
              alt={work.coverAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.12),rgba(6,6,6,0.86))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(244,92,44,0.2),transparent_28%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="warm">{work.genre}</Badge>
                  <Badge>{work.durationMinutes} min</Badge>
                  <Badge
                    variant={work.status === "active" ? "active" : "archive"}
                  >
                    {workStatusLabel[work.status]}
                  </Badge>
                </div>

                <h1 className="mt-5 text-[3rem] leading-[0.92] text-white sm:text-[4.2rem] lg:text-[5rem]">
                  {work.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-strong sm:text-lg">
                  {work.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
