import { Badge } from "@/components/ui/badge";
import type { DatabaseEnum } from "@/types/database";

type WorksStatusBadgeProps = {
  status: DatabaseEnum<"work_status">;
};

const statusLabels = {
  active: "En cartel",
  archive: "Archivo",
};

export function WorksStatusBadge({ status }: WorksStatusBadgeProps) {
  return (
    <Badge variant={status === "active" ? "active" : "archive"}>
      {statusLabels[status]}
    </Badge>
  );
}
