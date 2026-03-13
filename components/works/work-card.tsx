import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Panel } from "@/components/ui/panel";
import { workStatusLabel } from "@/lib/theme";
import type { Work } from "@/types/content";

type WorkCardProps = {
  work: Work;
};

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Panel
      as="article"
      variant="card"
      padding="sm"
      interactive
      className="group flex h-full flex-col overflow-hidden"
    >
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
        <div className="relative aspect-[4/5]">
          <Image
            src={work.coverImage}
            alt={work.coverAlt}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 640px) calc(50vw - 2.5rem), calc(100vw - 3rem)"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.78))]" />
          <div className="absolute left-4 top-4">
            <Badge variant={work.status === "active" ? "active" : "archive"}>
              {workStatusLabel[work.status]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex flex-wrap gap-2">
          <Badge>{work.genre}</Badge>
          <Badge>{work.durationMinutes} min</Badge>
        </div>
        <h3 className="mt-4 text-balance text-[2.3rem] leading-none text-white sm:text-4xl">
          {work.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          {work.shortDescription}
        </p>

        <div className="mt-6">
          <ButtonLink href={`/obras/${work.slug}`} variant="secondary" size="md">
            Ver obra
          </ButtonLink>
        </div>
      </div>
    </Panel>
  );
}
