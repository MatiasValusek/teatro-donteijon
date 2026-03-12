import type { NewsPost } from "@/types/content";

export const newsPosts: NewsPost[] = [
  {
    id: "news-estreno-aplauso",
    slug: "lo-que-queda-del-aplauso-abre-la-temporada-2026",
    title: "Lo que queda del aplauso abre la temporada 2026 de VdN",
    excerpt:
      "El nuevo estreno del grupo inaugura el ano con una puesta nocturna, frontal y atravesada por la pregunta sobre que queda vivo despues de una funcion.",
    content:
      "La nueva temporada de Vamos de Nuevo se abre con Lo que queda del aplauso, una obra que trabaja sobre memoria, eco y presencia. El material nacio en sala a partir de improvisaciones, relatos personales y una serie de escenas que fueron afinando su forma hasta encontrar un tono propio.\n\nDurante los ultimos meses el grupo trabajo sobre una puesta mas directa, con una escena que busca quedar cerca del publico sin perder espesor visual. La luz, el sonido y los silencios forman parte de la dramaturgia de la misma manera que el texto y el cuerpo.\n\nEl estreno marca tambien el inicio de una etapa donde VdN quiere sostener un dialogo mas fluido con espectadores, espacios culturales y redes de circulacion independiente. La idea no es solo presentar una obra nueva, sino abrir una conversacion alrededor del proceso, los materiales y la manera en que el grupo piensa la escena.\n\nLa primera funcion de la temporada sera el 18 de abril de 2026 en La Plata y funcionara como punto de partida para una agenda que seguira creciendo durante el ano.",
    coverImage: "/images/news/news-cover-estreno-aplauso.svg",
    coverAlt: "Escena teatral con dos figuras y un aplauso suspendido en penumbra",
    gallery: [
      {
        src: "/images/news/news-detail-stage-notes.svg",
        alt: "Mesa de trabajo con libreto, anotaciones y una lampara calida",
      },
      {
        src: "/images/news/news-detail-conversation.svg",
        alt: "Conversacion del elenco despues de un ensayo",
      },
    ],
    category: "estreno",
    publishedAt: "2026-03-10",
    featured: true,
  },
  {
    id: "news-festival-transito",
    slug: "vdn-participa-del-festival-escena-en-transito",
    title: "VdN participa del Festival Escena en Transito",
    excerpt:
      "El grupo formara parte de una programacion dedicada a nuevas dramaturgias y procesos escenicos independientes junto a companias de distintas ciudades.",
    content:
      "En mayo de 2026 Vamos de Nuevo se suma al Festival Escena en Transito, un encuentro que reune proyectos escenicos con foco en dramaturgias contemporaneas, experimentacion y circulacion federal.\n\nLa participacion de VdN incluira funcion, conversacion posterior y una instancia breve de intercambio con otros equipos de trabajo. Para el grupo, este tipo de espacios no solo amplian la circulacion de las obras, sino que tambien permiten contrastar metodos, ritmos y preguntas con otras escenas.\n\nEl festival representa una oportunidad concreta para seguir consolidando la presencia del grupo por fuera de su territorio inmediato, manteniendo una identidad propia y una forma de trabajo ligada al ensayo, la revision y la construccion colectiva.\n\nEn las proximas semanas se compartiran horarios, sedes y detalles de entradas a traves de los canales habituales del grupo.",
    coverImage: "/images/news/news-cover-festival-transito.svg",
    coverAlt: "Cartel escenico con luces rojizas y una multitud en sombras",
    gallery: [
      {
        src: "/images/news/news-detail-audience.svg",
        alt: "Publico en una sala pequena antes del comienzo de una funcion",
      },
    ],
    category: "festival",
    publishedAt: "2026-03-04",
    featured: false,
  },
  {
    id: "news-taller-presencia",
    slug: "abre-el-taller-cuerpo-ritmo-y-presencia",
    title: "Abre el taller Cuerpo, ritmo y presencia",
    excerpt:
      "VdN lanza un espacio intensivo de entrenamiento para actores, performers y personas interesadas en investigar el cuerpo como herramienta escenica.",
    content:
      "Durante abril se abrira una nueva edicion del taller Cuerpo, ritmo y presencia, una propuesta de entrenamiento coordinada por integrantes del grupo a partir de herramientas que forman parte de su practica cotidiana.\n\nEl espacio trabajara con ejercicios de disponibilidad fisica, escucha, composicion, respiracion y construccion de dinamicas colectivas. No esta pensado como una clase demostrativa, sino como un laboratorio donde cada participante pueda probar materiales, afinarlos y descubrir sus propios modos de habitar la escena.\n\nLa convocatoria esta dirigida a actores, estudiantes, bailarines, performers y personas que quieran acercarse al trabajo escenico desde una perspectiva sensible y contemporanea. El cupo sera reducido para sostener una experiencia cuidada y de seguimiento cercano.\n\nLa inscripcion y la informacion completa se publicaran por Instagram y por correo durante los primeros dias de abril.",
    coverImage: "/images/news/news-cover-taller-presencia.svg",
    coverAlt: "Cuerpos entrenando en diagonal sobre un escenario oscuro",
    gallery: [
      {
        src: "/images/news/news-detail-stage-notes.svg",
        alt: "Anotaciones de ensayo sobre una mesa de trabajo",
      },
      {
        src: "/images/news/news-detail-audience.svg",
        alt: "Sala vacia preparada para un encuentro de formacion",
      },
    ],
    category: "taller",
    publishedAt: "2026-02-26",
    featured: false,
  },
  {
    id: "news-prensa-radio",
    slug: "radio-universidad-conversa-con-vdn-sobre-proceso-y-cartelera",
    title: "Radio Universidad conversa con VdN sobre proceso y cartelera",
    excerpt:
      "Una entrevista reciente puso en foco la manera en que el grupo piensa sus obras, sus ensayos y la construccion de una identidad teatral independiente.",
    content:
      "Esta semana integrantes de Vamos de Nuevo participaron de una entrevista en Radio Universidad para hablar sobre el momento actual del grupo, la temporada 2026 y el lugar que ocupa el ensayo en cada proyecto.\n\nLa conversacion recorrio la historia de VdN, el pasaje de los laboratorios a las obras en cartel y la decision de sostener una identidad visual y escenica sin caer en formas institucionales. Tambien se hablo de la relacion con el publico, de la experiencia de producir desde el circuito independiente y de los materiales que estan apareciendo en los procesos mas recientes.\n\nLa nota funciona como una nueva puerta de entrada para quienes todavia no conocen al grupo y como una forma de registrar en palabras aquello que muchas veces solo se ve en la escena.\n\nEn los proximos dias compartiremos el enlace a la entrevista completa para quienes quieran escucharla.",
    coverImage: "/images/news/news-cover-prensa-radio.svg",
    coverAlt: "Micros, consola y un escenario sugerido por luces calidas",
    category: "prensa",
    publishedAt: "2026-02-18",
    featured: false,
  },
  {
    id: "news-anuncio-buenos-aires",
    slug: "manual-para-volver-a-escena-suma-funcion-en-buenos-aires",
    title: "Manual para volver a escena suma funcion en Buenos Aires",
    excerpt:
      "Se agrega una presentacion especial con conversacion posterior para seguir expandiendo la circulacion de la obra fuera de La Plata.",
    content:
      "La agenda de mayo suma una nueva fecha para Manual para volver a escena en la Ciudad de Buenos Aires. La funcion sera el 15 de mayo de 2026 y estara acompanada por una conversacion breve al cierre, pensada como extension natural del trabajo de la obra.\n\nPara el grupo, cada salida a otra ciudad no implica solo traslado logistico: supone revisar la puesta, escuchar como cambia la obra en otro contexto y volver a pensar el vinculo con el publico desde una situacion nueva.\n\nLa fecha en Buenos Aires forma parte de una estrategia de circulacion gradual que busca fortalecer la presencia del grupo en distintos espacios, manteniendo una produccion posible y una identidad estetica clara.\n\nLas entradas y el detalle del lugar ya estan disponibles en la seccion de funciones del sitio.",
    coverImage: "/images/news/news-cover-anuncio-fecha.svg",
    coverAlt: "Cartelera encendida con tipografia teatral y una calle nocturna",
    category: "anuncio",
    publishedAt: "2026-03-08",
    featured: false,
  },
  {
    id: "news-ensayo-abierto",
    slug: "abril-trae-ensayo-abierto-y-conversacion-con-el-publico",
    title: "Abril trae ensayo abierto y conversacion con el publico",
    excerpt:
      "VdN prepara una jornada especial para compartir material en proceso, abrir preguntas y mostrar parte del trabajo antes del estreno.",
    content:
      "Antes del estreno de la nueva temporada, Vamos de Nuevo abrira una instancia de ensayo abierto para compartir una parte del proceso con publico, colegas y personas cercanas al grupo.\n\nLa jornada no se piensa como adelanto promocional, sino como una situacion de trabajo compartido. Habra escenas en prueba, lectura de materiales, intercambio sobre decisiones de puesta y un momento final de conversacion.\n\nEste tipo de encuentros forman parte del modo en que VdN entiende su practica: una escena que no se cierra sobre si misma y que puede alojar la mirada de otros incluso antes de llegar a su forma definitiva.\n\nLa fecha exacta y el sistema de reserva se anunciaran a comienzos de abril por los canales habituales.",
    coverImage: "/images/news/news-cover-ensayo-abierto.svg",
    coverAlt: "Sala de ensayo abierta con sillas, luz tenue y personas reunidas",
    gallery: [
      {
        src: "/images/news/news-detail-conversation.svg",
        alt: "Elenco reunido en ronda despues de una muestra de proceso",
      },
      {
        src: "/images/news/news-detail-audience.svg",
        alt: "Butacas y publico en una sala intima",
      },
    ],
    category: "anuncio",
    publishedAt: "2026-03-01",
    featured: false,
  },
];
