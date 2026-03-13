import { AdminList } from "@/components/admin/admin-list";
import { Badge } from "@/components/ui/badge";
import type { AdminFunctionListItem } from "@/lib/queries/admin";
import { FunctionActiveBadge } from "./function-active-badge";

type FunctionsAdminListProps = {
  items: AdminFunctionListItem[];
};

export function FunctionsAdminList({ items }: FunctionsAdminListProps) {
  return (
    <AdminList
      emptyTitle="Todavia no hay funciones cargadas."
      emptyDescription="Crea la primera funcion para empezar a poblar la agenda publica."
      items={items.map((item) => ({
        id: item.id,
        title: item.venue_name,
        href: `/admin/funciones/${item.id}`,
        eyebrow: item.workTitle ?? "Obra sin asociar",
        description: item.venue_address,
        badges: [
          <FunctionActiveBadge key="active" active={item.is_active} />,
          <Badge key="reservation-mode" variant={item.reservation_url ? "soft" : "success"}>
            {item.reservation_url ? "Canal externo" : "Reserva interna"}
          </Badge>,
        ],
        meta: [
          <Badge key="starts-at" variant="soft">
            {item.startsAtLabel}
          </Badge>,
          <Badge key="price" variant="soft">
            {item.ticket_price_text ?? "Sin precio"}
          </Badge>,
        ],
      }))}
    />
  );
}
