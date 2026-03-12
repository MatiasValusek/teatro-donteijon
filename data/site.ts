import type { ContactChannel } from "@/types/content";
import type { SiteConfig, SocialLink } from "@/types/site";

export const siteConfig: SiteConfig = {
  groupName: "Vamos de Nuevo",
  name: "Vamos de Nuevo",
  shortName: "VdN",
  tagline: "Teatro independiente",
  description:
    "Grupo de teatro independiente dedicado a la creacion colectiva, la exploracion escenica y el encuentro con el publico.",
  footerDescription:
    "Funciones, prensa, talleres y propuestas artisticas en una presencia digital pensada para crecer sin perder identidad.",
  email: "hola@vamosdenuevo.ar",
  pressEmail: "prensa@vamosdenuevo.ar",
  instagramUrl: "https://instagram.com/vamosdenuevo.teatro",
  instagramHandle: "@vamosdenuevo.teatro",
  phone: "+54 221 555 0148",
  city: "La Plata, Buenos Aires",
};

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    href: siteConfig.instagramUrl,
    external: true,
  },
];

export const contactTopics: ContactChannel[] = [
  {
    label: "Funciones",
    title: "Programacion, funciones y reservas futuras",
    description:
      "Un canal pensado para coordinar agenda, propuestas de salas, invitaciones, festivales y futuras reservas del grupo.",
  },
  {
    label: "Prensa",
    title: "Notas, entrevistas y materiales de difusion",
    description:
      "La estructura ya queda preparada para sumar dossier, imagenes, gacetillas y consultas de medios cuando la operacion lo requiera.",
  },
  {
    label: "Talleres",
    title: "Actividades, laboratorios y espacios de formacion",
    description:
      "Ideal para abrir conversacion sobre talleres, encuentros, clinicas y propuestas artisticas vinculadas al trabajo de VdN.",
  },
];
