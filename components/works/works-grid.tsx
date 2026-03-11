import { WorkCard } from "@/components/works/work-card";
import { cn } from "@/lib/utils";
import type { Work } from "@/types/content";

type WorksGridProps = {
  works: Work[];
  className?: string;
};

export function WorksGrid({ works, className }: WorksGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
}
