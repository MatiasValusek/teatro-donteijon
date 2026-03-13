import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { AdminFormNotice } from "@/components/admin/form-fields";
import { ReservationsAdminList } from "@/components/admin/reservations/reservations-admin-list";
import { getAdminReservations } from "@/lib/queries/admin";

type AdminReservationsPageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminReservationsPage({
  searchParams,
}: AdminReservationsPageProps) {
  const [{ updated, error }, items] = await Promise.all([
    searchParams,
    getAdminReservations(),
  ]);

  return (
    <>
      <AdminPageTitle
        title="Reservas"
        description="Solicitudes internas recibidas desde las funciones que usan formulario propio en la web."
      />

      <AdminFormNotice
        saved={updated === "1"}
        error={error === "1" ? "No se pudo actualizar el estado de la reserva." : undefined}
      />

      <ReservationsAdminList items={items} />
    </>
  );
}
