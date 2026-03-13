import type { ContactChannel } from "@/types/content";
import type { SiteConfig, SiteHighlight, SocialLink } from "@/types/site";

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

export const companyHighlights: SiteHighlight[] = [
  {
    kicker: "Presencia",
    title: "Escena cercana",
    description:
      "Funciones pensadas para conservar intensidad y detalle tanto en salas como en espacios culturales de escala media.",
  },
  {
    kicker: "Proceso",
    title: "Ensayo vivo",
    description:
      "Cada montaje nace del cruce entre texto, improvisacion, revision formal y escucha del presente.",
  },
  {
    kicker: "Territorio",
    title: "Red independiente",
    description:
      "El grupo piensa circulacion, alianzas y giras sin perder una voz estetica definida.",
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
      "El sitio ya sostiene una base ordenada para sumar dossier, imagenes, gacetillas y consultas de medios cuando la operacion lo requiera.",
  },
  {
    label: "Talleres",
    title: "Actividades, laboratorios y espacios de formacion",
    description:
      "Ideal para abrir conversacion sobre talleres, encuentros, clinicas y propuestas artisticas vinculadas al trabajo de VdN.",
  },
];
