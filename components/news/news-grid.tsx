import { cn } from "@/lib/utils";
import type { NewsPost } from "@/types/content";
import { NewsCard } from "./news-card";

type NewsGridProps = {
  posts: NewsPost[];
  className?: string;
};

export function NewsGrid({ posts, className }: NewsGridProps) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-3", className)}>
      {posts.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </div>
  );
}
