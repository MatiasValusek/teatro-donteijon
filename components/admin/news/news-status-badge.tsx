import { Badge } from "@/components/ui/badge";
import { newsCategoryLabel } from "@/lib/theme";
import type { NewsCategory } from "@/types/content";

type NewsStatusBadgeProps = {
  category: NewsCategory;
};

export function NewsStatusBadge({ category }: NewsStatusBadgeProps) {
  return <Badge variant="warm">{newsCategoryLabel[category]}</Badge>;
}
