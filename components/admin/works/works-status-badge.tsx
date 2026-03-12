import { cn } from "@/lib/utils";
import type { DatabaseEnum } from "@/types/database";

type WorksStatusBadgeProps = {
  status: DatabaseEnum<"work_status">;
};

const statusStyles = {
  active: "border-orange-300/18 bg-orange-300/10 text-orange-100",
  archive: "border-white/12 bg-white/8 text-white",
};

const statusLabels = {
  active: "En cartel",
  archive: "Archivo",
};

export function WorksStatusBadge({ status }: WorksStatusBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em]",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
