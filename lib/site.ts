export const siteConfig = {
  name: "Vamos de Nuevo",
  shortName: "VdN",
  email: "hola@vamosdenuevo.ar",
  city: "La Plata, Buenos Aires",
  instagram: "https://instagram.com/vamosdenuevo.teatro",
};

export const primaryNavigation = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/obras", label: "Obras" },
  { href: "/funciones", label: "Funciones" },
  { href: "/novedades", label: "Novedades" },
];

export const footerNavigation = [
  ...primaryNavigation,
  { href: "/contacto", label: "Contacto" },
];
