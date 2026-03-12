import { siteConfig } from "@/data/site";
import type { GroupGalleryImage, GroupInfo } from "@/types/about";

export const groupInfo: GroupInfo = {
  name: "Vamos de Nuevo",
  shortName: "VdN",
  subtitle:
    "Vamos de Nuevo es un grupo de teatro independiente dedicado a la creacion colectiva, la exploracion escenica y el encuentro con el publico.",
  history: [
    "VdN nacio en La Plata a partir de una serie de laboratorios donde la pregunta inicial no era que obra montar, sino que tipo de presencia queriamos construir en escena. Desde el comienzo, el grupo entendio el ensayo como un espacio de escucha, prueba y convivencia entre lenguajes.",
    "Con los primeros procesos aparecieron tambien los materiales que hoy siguen definiendo la identidad del grupo: dramaturgias abiertas, trabajo fisico, revision constante de la puesta y una relacion cercana con el publico. Cada estreno fue consolidando una forma de hacer que se apoya tanto en la precision formal como en el riesgo de lo vivo.",
    "Hoy Vamos de Nuevo funciona como una plataforma de creacion y circulacion. Ensaya, produce, vuelve sobre sus propios metodos y piensa cada proyecto como parte de una conversacion mayor con salas, festivales, comunidades y espectadores.",
  ],
  manifesto: [
    "Para VdN el teatro no es una pieza cerrada ni una ilustracion de ideas previas. Es un campo de trabajo donde el cuerpo, la palabra, la luz, el ritmo y la mirada del otro se afectan mutuamente hasta producir una forma singular.",
    "Nos interesa la escena cuando todavia esta preguntandose algo. Cuando el ensayo conserva zonas porosas, cuando el error obliga a reformular, cuando la repeticion ya no es copia sino una via para afinar presencia y sentido.",
    "Cada montaje busca sostener una tension: ser riguroso sin volverse rigido, ser sensible sin perder filo, ser contemporaneo sin depender de modas. El teatro, para nosotros, sigue siendo una practica de encuentro.",
  ],
  highlightedQuote:
    "Entendemos la escena como busqueda, repeticion, riesgo y encuentro.",
  heroImage: "/images/about/about-hero.svg",
  historyImage: "/images/about/about-history.svg",
  contactEmail: siteConfig.email,
  instagramUrl: siteConfig.instagramUrl,
  focusAreas: [
    "Creacion colectiva",
    "Laboratorio escenico",
    "Direccion compartida",
    "Vinculo con el publico",
  ],
  manifestoPillars: ["Busqueda", "Presencia", "Ritmo", "Encuentro"],
  milestones: [
    {
      label: "Inicio",
      title: "Laboratorios y primeras salas",
      description:
        "Los procesos arrancaron en espacios de ensayo pequenos, con material propio y circulacion en la red independiente platense.",
    },
    {
      label: "Metodo",
      title: "Ensayo como lenguaje",
      description:
        "La metodologia del grupo se consolido alrededor de la prueba escenica, la revision colectiva y el trabajo corporal.",
    },
    {
      label: "Hoy",
      title: "Obras, funciones y comunidad",
      description:
        "VdN sigue produciendo obras, activando funciones y construyendo un dialogo sostenido con nuevos publicos.",
    },
  ],
};

export const groupGallery: GroupGalleryImage[] = [
  {
    id: "gallery-ensayo-corporal",
    src: "/images/about/gallery-ensayo-corporal.svg",
    alt: "Ensayo corporal con luz roja y cuerpos en movimiento",
    caption: "Un ensayo donde el movimiento ordena la escena antes que la palabra.",
    category: "Ensayo",
  },
  {
    id: "gallery-lectura-mesa",
    src: "/images/about/gallery-lectura-mesa.svg",
    alt: "Lectura de mesa con libretos y luces calidas",
    caption: "Lecturas, anotaciones y conversaciones para afinar el tono del material.",
    category: "Proceso",
  },
  {
    id: "gallery-backstage-vestuario",
    src: "/images/about/gallery-backstage-vestuario.svg",
    alt: "Backstage con vestuario, percheros y una luz tenue",
    caption: "El backstage tambien es parte del relato: espera, detalle y transformacion.",
    category: "Backstage",
  },
  {
    id: "gallery-escena-roja",
    src: "/images/about/gallery-escena-roja.svg",
    alt: "Escena frontal con un gran bano de luz roja",
    caption: "La escena aparece como imagen viva, frontal, intensa y cercana.",
    category: "Escena",
  },
  {
    id: "gallery-encuentro-publico",
    src: "/images/about/gallery-encuentro-publico.svg",
    alt: "Encuentro del elenco con publico despues de una funcion",
    caption: "Las conversaciones posteriores extienden la funcion mas alla del aplauso.",
    category: "Encuentro",
  },
  {
    id: "gallery-ronda-trabajo",
    src: "/images/about/gallery-ronda-trabajo.svg",
    alt: "Ronda de trabajo del grupo en la sala de ensayo",
    caption: "La identidad de VdN se sostiene en trabajo compartido, escucha y circulacion de ideas.",
    category: "Grupo",
  },
];
