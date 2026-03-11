import type { ContactChannel, NewsItem, Performance, Work } from "@/types/content";

export const siteStatement = [
  "Vamos de Nuevo es un grupo de teatro independiente que trabaja desde la cercanía con el público, la potencia del cuerpo en escena y una identidad visual que evita la neutralidad.",
  "La base del sitio está construida para priorizar experiencia móvil, lectura clara y una arquitectura lista para crecer con programación real, prensa y materiales de cada obra.",
];

export const companyHighlights = [
  {
    kicker: "Presencia",
    title: "Escena cercana",
    description:
      "Funciones diseñadas para conservar intensidad y detalle tanto en salas como en espacios culturales de escala media.",
  },
  {
    kicker: "Proceso",
    title: "Ensayo vivo",
    description:
      "Cada montaje nace del cruce entre texto, improvisación, revisión formal y escucha del presente.",
  },
  {
    kicker: "Territorio",
    title: "Red independiente",
    description:
      "El grupo piensa circulación, alianzas y giras sin perder una voz estética definida.",
  },
];

export const companyValues = [
  {
    kicker: "01",
    title: "Dirección compartida",
    description:
      "Decisiones escénicas discutidas desde la puesta, el ritmo y el vínculo con el espectador.",
  },
  {
    kicker: "02",
    title: "Diseño atmosférico",
    description:
      "Luz, sonido, vestuario y gráfica entendidos como parte del mismo relato y no como capas separadas.",
  },
  {
    kicker: "03",
    title: "Escalabilidad real",
    description:
      "Una base digital preparada para crecer sin refactors innecesarios cuando aparezcan contenidos y necesidades nuevas.",
  },
];

export const works: Work[] = [
  {
    slug: "lo-que-queda-del-aplauso",
    title: "Lo que queda del aplauso",
    summary:
      "Una obra sobre el eco de lo dicho tarde, los afectos en ruina y la necesidad de volver a escena.",
    description:
      "Dos intérpretes regresan a un teatro casi vacío para reconstruir una función interrumpida. La pieza trabaja memoria, repetición y deseo de permanecer cuando todo parece haber terminado.",
    durationMinutes: 75,
    premiereSeason: "Temporada 2026",
    stage: "estreno",
    tone: "garnet",
    featured: true,
    tags: ["Drama", "Contemporánea", "Sala"],
    cast: ["Lucía Herrera", "Julián Soria"],
    direction: "Dirección colectiva VdN",
  },
  {
    slug: "manual-para-volver-a-escena",
    title: "Manual para volver a escena",
    summary:
      "Una partitura física y coral sobre volver a empezar cuando el lenguaje ya no alcanza.",
    description:
      "Cinco cuerpos atraviesan consignas, canciones y fragmentos documentales para revisar la idea de recomenzar. El montaje combina humor seco, precisión coreográfica y una temperatura muy cercana.",
    durationMinutes: 65,
    premiereSeason: "Repertorio 2026",
    stage: "repertorio",
    tone: "ember",
    tags: ["Coral", "Físico", "Gira"],
    cast: ["Mora Paz", "Irene Vidal", "Tomás Del Río"],
    direction: "Camila Núñez",
  },
  {
    slug: "las-brasas-siguen-encendidas",
    title: "Las brasas siguen encendidas",
    summary:
      "Un laboratorio escénico sobre duelo, comunidad y pequeños rituales de resistencia cotidiana.",
    description:
      "Esta obra en proceso toma relatos mínimos y materiales documentales para pensar qué queda vivo después de una pérdida. La estructura está abierta y puede mutar según espacio y público.",
    durationMinutes: 55,
    premiereSeason: "Laboratorio 2026",
    stage: "laboratorio",
    tone: "gold",
    tags: ["Proceso", "Sitio específico", "Investigación"],
    cast: ["Elenco VdN"],
    direction: "Agustina Ferrero",
  },
];

export const performances: Performance[] = [
  {
    id: "funcion-abril-pasaje",
    workSlug: "lo-que-queda-del-aplauso",
    venue: "Pasaje Dardo Rocha",
    city: "La Plata",
    date: "2026-04-18",
    time: "21:00",
    availability: "abierta",
    tags: ["Estreno", "Sala principal"],
  },
  {
    id: "funcion-mayo-espacio44",
    workSlug: "manual-para-volver-a-escena",
    venue: "Espacio 44",
    city: "La Plata",
    date: "2026-05-02",
    time: "20:30",
    availability: "ultimas",
    tags: ["Repertorio", "Con charla post función"],
  },
  {
    id: "funcion-mayo-giratoria",
    workSlug: "manual-para-volver-a-escena",
    venue: "Sala Giratoria",
    city: "Buenos Aires",
    date: "2026-05-15",
    time: "21:30",
    availability: "abierta",
    tags: ["Gira", "Una noche"],
  },
  {
    id: "funcion-junio-laboratorio",
    workSlug: "las-brasas-siguen-encendidas",
    venue: "Centro Cultural Islas Malvinas",
    city: "La Plata",
    date: "2026-06-06",
    time: "19:00",
    availability: "proxima",
    tags: ["Muestra de proceso", "Cupón anticipado"],
  },
];

export const newsItems: NewsItem[] = [
  {
    slug: "residencia-escenica-otono",
    title: "Arranca la residencia escénica de otoño",
    excerpt:
      "Durante abril de 2026 el grupo abre ensayos, reuniones de diseño y una clínica interna para cerrar el nuevo estreno.",
    publishedAt: "2026-03-06",
    category: "proceso",
    tone: "gold",
    tags: ["Proceso", "Ensayos"],
  },
  {
    slug: "nueva-fecha-buenos-aires",
    title: "Se suma una fecha en Buenos Aires",
    excerpt:
      "Manual para volver a escena incorpora una presentación especial el 15 de mayo de 2026 con conversación posterior.",
    publishedAt: "2026-03-08",
    category: "gira",
    tone: "ember",
    tags: ["Gira", "Agenda"],
  },
  {
    slug: "apertura-temporada-2026",
    title: "La temporada 2026 abre con un estreno nuevo",
    excerpt:
      "Lo que queda del aplauso inaugura la nueva etapa del grupo con una puesta más frontal, íntima y nocturna.",
    publishedAt: "2026-03-10",
    category: "estreno",
    tone: "garnet",
    tags: ["Estreno", "Temporada 2026"],
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: "Programación",
    title: "Fechas, funciones y dossier",
    description:
      "Base lista para sumar contrataciones, ficha técnica y materiales de prensa sin cambiar estructura.",
  },
  {
    label: "Comunidad",
    title: "Novedades y seguimiento",
    description:
      "El canal natural para mailing, avisos de funciones y vínculo con público cuando definamos automatizaciones.",
  },
  {
    label: "Alianzas",
    title: "Coproducciones y espacios",
    description:
      "Preparado para vincular salas, festivales, centros culturales y otras redes independientes.",
  },
];
