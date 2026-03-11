import type { ContactChannel, NewsItem } from "@/types/content";

export const siteStatement = [
  "Vamos de Nuevo es un grupo de teatro independiente que trabaja desde la cercania con el publico, la potencia del cuerpo en escena y una identidad visual que evita la neutralidad.",
  "La base del sitio esta construida para priorizar experiencia movil, lectura clara y una arquitectura lista para crecer con programacion real, prensa y materiales de cada obra.",
];

export const companyHighlights = [
  {
    kicker: "Presencia",
    title: "Escena cercana",
    description:
      "Funciones disenadas para conservar intensidad y detalle tanto en salas como en espacios culturales de escala media.",
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

export const companyValues = [
  {
    kicker: "01",
    title: "Direccion compartida",
    description:
      "Decisiones escenicas discutidas desde la puesta, el ritmo y el vinculo con el espectador.",
  },
  {
    kicker: "02",
    title: "Diseno atmosferico",
    description:
      "Luz, sonido, vestuario y grafica entendidos como parte del mismo relato y no como capas separadas.",
  },
  {
    kicker: "03",
    title: "Escalabilidad real",
    description:
      "Una base digital preparada para crecer sin refactors innecesarios cuando aparezcan contenidos y necesidades nuevas.",
  },
];

export const newsItems: NewsItem[] = [
  {
    slug: "residencia-escenica-otono",
    title: "Arranca la residencia escenica de otono",
    excerpt:
      "Durante abril de 2026 el grupo abre ensayos, reuniones de diseno y una clinica interna para cerrar el nuevo estreno.",
    publishedAt: "2026-03-06",
    category: "proceso",
    tone: "gold",
    tags: ["Proceso", "Ensayos"],
  },
  {
    slug: "nueva-fecha-buenos-aires",
    title: "Se suma una fecha en Buenos Aires",
    excerpt:
      "Manual para volver a escena incorpora una presentacion especial el 15 de mayo de 2026 con conversacion posterior.",
    publishedAt: "2026-03-08",
    category: "gira",
    tone: "ember",
    tags: ["Gira", "Agenda"],
  },
  {
    slug: "apertura-temporada-2026",
    title: "La temporada 2026 abre con un estreno nuevo",
    excerpt:
      "Lo que queda del aplauso inaugura la nueva etapa del grupo con una puesta mas frontal, intima y nocturna.",
    publishedAt: "2026-03-10",
    category: "estreno",
    tone: "garnet",
    tags: ["Estreno", "Temporada 2026"],
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: "Programacion",
    title: "Fechas, funciones y dossier",
    description:
      "Base lista para sumar contrataciones, ficha tecnica y materiales de prensa sin cambiar estructura.",
  },
  {
    label: "Comunidad",
    title: "Novedades y seguimiento",
    description:
      "El canal natural para mailing, avisos de funciones y vinculo con publico cuando definamos automatizaciones.",
  },
  {
    label: "Alianzas",
    title: "Coproducciones y espacios",
    description:
      "Preparado para vincular salas, festivales, centros culturales y otras redes independientes.",
  },
];
