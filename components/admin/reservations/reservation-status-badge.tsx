import { Badge } from "@/components/ui/badge";
import type { ReservationStatus } from "@/types/inbox";

const statusLabel: Record<ReservationStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

const statusVariant: Record<ReservationStatus, "warm" | "success" | "archive"> = {
  pending: "warm",
  confirmed: "success",
  cancelled: "archive",
};

type ReservationStatusBadgeProps = {
  status: ReservationStatus;
};

export function ReservationStatusBadge({
  status,
}: ReservationStatusBadgeProps) {
  return (
    <Badge variant={statusVariant[status]}>
      {statusLabel[status]}
    </Badge>
  );
}
