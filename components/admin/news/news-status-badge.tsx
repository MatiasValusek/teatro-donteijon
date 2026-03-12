import { newsCategoryLabel } from "@/lib/theme";
import type { NewsCategory } from "@/types/content";

type NewsStatusBadgeProps = {
  category: NewsCategory;
};

export function NewsStatusBadge({ category }: NewsStatusBadgeProps) {
  return (
    <span className="rounded-full border border-orange-300/18 bg-orange-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-orange-100">
      {newsCategoryLabel[category]}
    </span>
  );
}
