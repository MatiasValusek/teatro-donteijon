import { updateReservationStatus } from "@/lib/actions/reservations";
import type { AdminReservationListItem, ReservationStatus } from "@/types/inbox";
import { Badge } from "@/components/ui/badge";
import { ReservationStatusBadge } from "./reservation-status-badge";

const statusOptions: Array<{
  value: ReservationStatus;
  label: string;
}> = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmada" },
  { value: "cancelled", label: "Cancelada" },
];

type ReservationsAdminListProps = {
  items: AdminReservationListItem[];
};

export function ReservationsAdminList({ items }: ReservationsAdminListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/12 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-2xl text-white">Todavia no hay reservas internas.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Cuando una funcion use reserva interna desde la web, las solicitudes
          van a aparecer automaticamente en este listado.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(10,10,10,0.98))] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/75">
                {item.workTitle}
              </p>
              <h3 className="mt-2 text-balance text-3xl leading-none text-white">
                {item.fullName}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {item.functionLabel}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="soft">{item.createdAtLabel}</Badge>
                <Badge variant="soft">{item.quantity} entradas</Badge>
                <Badge variant="soft">{item.email}</Badge>
                <Badge variant="soft">{item.phone}</Badge>
                <ReservationStatusBadge status={item.status} />
              </div>

              <p className="mt-4 text-sm leading-7 text-muted">
                {item.message?.trim() || "Sin mensaje adicional."}
              </p>
            </div>

            <form action={updateReservationStatus} className="grid gap-3 xl:w-56">
              <input type="hidden" name="id" value={item.id} />
              <label className="grid gap-2">
                <span className="text-sm font-medium text-white">Estado</span>
                <select
                  name="status"
                  defaultValue={item.status}
                  className="min-h-12 rounded-[1.1rem] border border-white/10 bg-black/35 px-4 text-sm text-white"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 text-sm font-semibold text-white hover:bg-white/10"
              >
                Guardar estado
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
