import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { workStatusLabel } from "@/lib/theme";
import type { Work } from "@/types/content";

type WorkCardProps = {
  work: Work;
};

export function WorkCard({ work }: WorkCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.05),rgba(10,10,10,0.98))] p-4 sm:p-5">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
        <div className="relative aspect-[4/5]">
          <Image
            src={work.coverImage}
            alt={work.coverAlt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
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

      <div className="mt-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{work.genre}</Badge>
          <Badge>{work.durationMinutes} min</Badge>
        </div>
        <h3 className="mt-4 text-4xl leading-none text-white">{work.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          {work.shortDescription}
        </p>
      </div>

      <div className="mt-6">
        <Link
          href={`/obras/${work.slug}`}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white hover:bg-white/8"
        >
          Ver obra
        </Link>
      </div>
    </article>
  );
}
