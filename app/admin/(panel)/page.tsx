import Link from "next/link";
import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { adminNavigation } from "@/lib/admin/navigation";
import { getAdminDashboardSummary } from "@/lib/queries/admin";

export default async function AdminDashboardPage() {
  const summary = await getAdminDashboardSummary();

  const sections = adminNavigation
    .filter((item) => item.href !== "/admin")
    .map((item) => {
      switch (item.href) {
        case "/admin/obras":
          return {
            ...item,
            meta: `${summary.worksCount} cargadas`,
          };
        case "/admin/funciones":
          return {
            ...item,
            meta: `${summary.functionsCount} programadas`,
          };
        case "/admin/novedades":
          return {
            ...item,
            meta: `${summary.newsCount} publicadas o en borrador`,
          };
        case "/admin/reservas":
          return {
            ...item,
            meta: `${summary.reservationsCount} recibidas`,
          };
        case "/admin/contacto":
          return {
            ...item,
            meta: `${summary.contactMessagesCount} mensajes`,
          };
        case "/admin/integrantes":
          return {
            ...item,
            meta: `${summary.membersCount} perfiles cargados`,
          };
        case "/admin/grupo":
          return {
            ...item,
            meta: summary.hasGroupInfo ? "Configurado" : "Pendiente de carga",
          };
        default:
          return {
            ...item,
            meta: "",
          };
      }
    });

  return (
    <>
      <AdminPageTitle
        title="Dashboard"
        description="Resumen breve del panel interno y accesos rapidos a cada bloque de gestion."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(10,10,10,0.98))] p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(16,16,16,0.98))] sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200/80">
              {section.meta}
            </p>
            <h3 className="mt-3 text-3xl leading-none text-white">
              {section.label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {section.description}
            </p>
            <span className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 text-sm font-semibold text-white">
              Abrir seccion
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
