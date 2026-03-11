import type { Work } from "@/types/content";

export const works: Work[] = [
  {
    id: "work-aplauso",
    slug: "lo-que-queda-del-aplauso",
    title: "Lo que queda del aplauso",
    shortDescription:
      "Una obra sobre el eco de lo que no llega a decirse y el deseo de volver a ocupar la escena.",
    fullDescription:
      "Dos interpretes regresan a una sala vacia para reconstruir una funcion que nunca termino. El montaje trabaja con memoria, repeticion y pequeñas fracturas afectivas para pensar que queda en pie cuando la funcion termina antes de tiempo.",
    coverImage: "/images/works/poster-aplauso.svg",
    coverAlt: "Poster teatral de Lo que queda del aplauso",
    gallery: [
      {
        src: "/images/works/gallery-backstage.svg",
        alt: "Ensayo con siluetas y luz roja",
      },
      {
        src: "/images/works/gallery-spotlight.svg",
        alt: "Escena con un foco principal y humo",
      },
      {
        src: "/images/works/gallery-ensemble.svg",
        alt: "Composicion coral con movimiento en escena",
      },
    ],
    genre: "Drama contemporaneo",
    durationMinutes: 75,
    status: "active",
    director: "Direccion colectiva VdN",
    cast: ["Lucia Herrera", "Julian Soria"],
    featured: true,
    artisticText:
      "La obra parte de un teatro en ruinas emocionales para poner en primer plano la pregunta por lo que sigue vivo cuando baja la ultima luz.",
    technicalSheet: [
      "Dramaturgia y direccion: Direccion colectiva VdN",
      "Asistencia artistica: Camila Nunez",
      "Diseno de luces: Sofia Rinaldi",
      "Musica original: Tomas del Rio",
    ],
  },
  {
    id: "work-manual",
    slug: "manual-para-volver-a-escena",
    title: "Manual para volver a escena",
    shortDescription:
      "Una partitura fisica y coral sobre recomenzar cuando el lenguaje ya no alcanza.",
    fullDescription:
      "Cinco cuerpos atraviesan consignas, canciones y materiales documentales para revisar la idea de recomenzar. La puesta mezcla humor seco, precision coreografica y una cercania sostenida con el publico.",
    coverImage: "/images/works/poster-manual.svg",
    coverAlt: "Poster teatral de Manual para volver a escena",
    gallery: [
      {
        src: "/images/works/gallery-ensemble.svg",
        alt: "Elenco en escena con desplazamientos diagonales",
      },
      {
        src: "/images/works/gallery-empty-stage.svg",
        alt: "Escenario con sillas, telon y luz calida",
      },
      {
        src: "/images/works/gallery-backstage.svg",
        alt: "Momento de transicion entre bastidores y escena",
      },
    ],
    genre: "Teatro fisico",
    durationMinutes: 65,
    status: "active",
    director: "Camila Nunez",
    cast: ["Mora Paz", "Irene Vidal", "Tomas del Rio", "Julia Mena"],
    featured: false,
    artisticText:
      "El dispositivo busca exponer el cuerpo como archivo inestable y transformar el ensayo en lenguaje visible.",
    technicalSheet: [
      "Direccion: Camila Nunez",
      "Coreografia: VdN laboratorio",
      "Vestuario: Abril Mendez",
      "Espacio sonoro: Mateo Suaya",
    ],
  },
  {
    id: "work-brasas",
    slug: "las-brasas-siguen-encendidas",
    title: "Las brasas siguen encendidas",
    shortDescription:
      "Un laboratorio escenico sobre duelo, comunidad y pequeños rituales de resistencia cotidiana.",
    fullDescription:
      "La obra toma relatos minimos y materiales documentales para pensar que queda vivo despues de una perdida. Su estructura es abierta y puede mutar segun el espacio y el tipo de encuentro con el publico.",
    coverImage: "/images/works/poster-brasas.svg",
    coverAlt: "Poster teatral de Las brasas siguen encendidas",
    gallery: [
      {
        src: "/images/works/gallery-spotlight.svg",
        alt: "Escena con niebla y foco tenue",
      },
      {
        src: "/images/works/gallery-empty-stage.svg",
        alt: "Sala vacia con objetos en espera",
      },
      {
        src: "/images/works/gallery-backstage.svg",
        alt: "Transicion de luces rojizas en un ensayo",
      },
    ],
    genre: "Laboratorio documental",
    durationMinutes: 55,
    status: "active",
    director: "Agustina Ferrero",
    cast: ["Elenco VdN"],
    featured: false,
    artisticText:
      "La obra propone una intimidad expandida: el publico entra a una escena que todavia esta preguntandose como existir.",
    technicalSheet: [
      "Direccion: Agustina Ferrero",
      "Investigacion: VdN",
      "Visuales: Rocio Danna",
      "Produccion: Paula Celleri",
    ],
  },
  {
    id: "work-silencio",
    slug: "el-borde-del-silencio",
    title: "El borde del silencio",
    shortDescription:
      "Una pieza del archivo reciente del grupo, construida sobre pausas, ausencias y respiracion compartida.",
    fullDescription:
      "Esta obra de repertorio anterior investigo la suspension del habla y los huecos entre palabra, sonido y gesto. Hoy permanece como parte del archivo del grupo y funciona como referencia poetica para nuevas creaciones.",
    coverImage: "/images/works/poster-silencio.svg",
    coverAlt: "Poster teatral de El borde del silencio",
    gallery: [
      {
        src: "/images/works/gallery-empty-stage.svg",
        alt: "Escenario oscuro con butacas iluminadas",
      },
      {
        src: "/images/works/gallery-ensemble.svg",
        alt: "Cuerpos en quietud dentro de una composicion coral",
      },
    ],
    genre: "Drama poetico",
    durationMinutes: 70,
    status: "archive",
    director: "VdN + invitados",
    cast: ["Maria Olmos", "Julian Soria", "Lara Ponce"],
    featured: false,
    artisticText:
      "La pieza trabaja la pausa como tension y propone mirar el silencio no como ausencia sino como materia escenica.",
    technicalSheet: [
      "Direccion: VdN + invitados",
      "Espacio escenico: Taller de montaje",
      "Luces: Martina Costa",
      "Registro visual: Nadir Vera",
    ],
  },
];
