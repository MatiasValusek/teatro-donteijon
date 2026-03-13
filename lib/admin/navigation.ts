export type AdminNavigationItem = {
  href: string;
  label: string;
  description: string;
};

export const adminNavigation: AdminNavigationItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Resumen general y accesos rapidos del panel interno.",
  },
  {
    href: "/admin/obras",
    label: "Obras",
    description: "Gestiona el repertorio, su estado editorial y el orden del catalogo.",
  },
  {
    href: "/admin/funciones",
    label: "Funciones",
    description: "Organiza agenda, sedes, horarios y enlaces de reserva.",
  },
  {
    href: "/admin/novedades",
    label: "Novedades",
    description: "Administra noticias, estrenos, prensa, talleres y anuncios.",
  },
  {
    href: "/admin/reservas",
    label: "Reservas",
    description: "Consulta las reservas internas que llegan desde las funciones publicas.",
  },
  {
    href: "/admin/contacto",
    label: "Contacto",
    description: "Revisa los mensajes generales enviados desde la web publica.",
  },
  {
    href: "/admin/integrantes",
    label: "Integrantes",
    description: "Edita las fichas de quienes forman parte del grupo.",
  },
  {
    href: "/admin/grupo",
    label: "Grupo",
    description: "Actualiza la informacion institucional base del sitio.",
  },
];

export function isAdminPathActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getAdminSection(pathname: string) {
  return (
    adminNavigation.find((item) => isAdminPathActive(pathname, item.href)) ??
    adminNavigation[0]
  );
}

export function getAdminHeaderMeta(pathname: string) {
  const section = getAdminSection(pathname);
  const segments = pathname.split("/").filter(Boolean);
  const actionSegment = segments[2];

  let actionLabel: string | null = null;

  if (actionSegment === "nueva" || actionSegment === "nuevo") {
    actionLabel = "Alta";
  } else if (actionSegment) {
    actionLabel = "Edicion";
  }

  return {
    title: section.label,
    description:
      actionLabel && section.href !== "/admin"
        ? `${actionLabel} dentro de ${section.label.toLowerCase()}.`
        : section.description,
    breadcrumb: ["VdN Admin", section.label, actionLabel]
      .filter(Boolean)
      .join(" / "),
  };
}
