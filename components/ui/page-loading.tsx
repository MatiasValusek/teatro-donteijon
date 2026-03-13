import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type PageLoadingProps = {
  variant?: "overview" | "detail";
};

function LoadingCard() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.04),rgba(12,12,12,0.94))] p-4">
      <Skeleton className="aspect-[4/5] w-full rounded-[1.6rem]" />
      <div className="mt-5 space-y-3">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-10 w-4/5 rounded-[1rem]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-11 w-32 rounded-full" />
      </div>
    </div>
  );
}

export function PageLoading({ variant = "overview" }: PageLoadingProps) {
  const isDetail = variant === "detail";

  return (
    <>
      <section
        className={cn(
          isDetail ? "page-hero-space-compact" : "page-hero-space",
          "overflow-hidden",
        )}
      >
        <Container>
          <div
            className={cn(
              "grid gap-8",
              isDetail ? "" : "lg:grid-cols-[1.05fr,0.95fr] lg:items-center",
            )}
          >
            {isDetail ? (
              <Skeleton className="min-h-[26rem] w-full rounded-[2.5rem] sm:min-h-[32rem] lg:min-h-[38rem]" />
            ) : (
              <>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-40 rounded-full" />
                  <Skeleton className="h-16 w-full max-w-2xl rounded-[1.6rem] sm:h-24" />
                  <Skeleton className="h-5 w-full max-w-xl" />
                  <Skeleton className="h-5 w-5/6 max-w-lg" />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Skeleton className="h-12 w-44 rounded-full" />
                    <Skeleton className="h-12 w-40 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Skeleton className="h-20 rounded-[1.5rem]" />
                    <Skeleton className="h-20 rounded-[1.5rem]" />
                    <Skeleton className="h-20 rounded-[1.5rem] max-sm:col-span-2" />
                  </div>
                </div>
                <Skeleton className="min-h-[26rem] rounded-[2.4rem] sm:min-h-[30rem]" />
              </>
            )}
          </div>
        </Container>
      </section>

      <section className="section-divider section-space">
        <Container>
          <div className="space-y-4">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-12 w-full max-w-2xl rounded-[1.5rem]" />
            <Skeleton className="h-4 w-full max-w-3xl" />
          </div>

          {isDetail ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Skeleton className="aspect-[16/9] w-full rounded-[1.8rem] sm:col-span-2" />
              <Skeleton className="aspect-[4/3] w-full rounded-[1.8rem]" />
              <Skeleton className="aspect-[4/3] w-full rounded-[1.8rem]" />
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
