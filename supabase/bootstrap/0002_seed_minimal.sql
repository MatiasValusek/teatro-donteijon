insert into public.group_info (
  name,
  short_name,
  subtitle,
  history,
  manifesto,
  highlighted_quote,
  hero_image_url,
  contact_email,
  press_email,
  instagram_url,
  phone,
  city
)
select
  'Vamos de Nuevo',
  'VdN',
  'Grupo de teatro independiente dedicado a la creacion escenica, el ensayo vivo y el encuentro con el publico.',
  array[
    'Vamos de Nuevo nace como un espacio de trabajo colectivo donde la escena se piensa desde el ensayo, la investigacion y el cruce entre distintas miradas.',
    'El grupo construye una practica sostenida en funciones, procesos y circulacion independiente, con base de trabajo en La Plata.'
  ]::text[],
  array[
    'Trabajamos desde la presencia, la escucha y el riesgo de la escena viva.',
    'Cada obra busca sostener una voz propia sin perder cercania con el publico.'
  ]::text[],
  'La escena aparece cuando el grupo encuentra una forma comun de sostener el trabajo.',
  '/images/about/about-hero.svg',
  'hola@vamosdenuevo.ar',
  'prensa@vamosdenuevo.ar',
  'https://instagram.com/vamosdenuevo.teatro',
  '+54 221 555 0148',
  'La Plata, Buenos Aires'
where not exists (
  select 1
  from public.group_info
);

insert into public.members (
  name,
  role,
  bio,
  image_url,
  sort_order,
  is_active
)
select
  seed.name,
  seed.role,
  seed.bio,
  seed.image_url,
  seed.sort_order,
  seed.is_active
from (
  values
    (
      'Camila Soria',
      'Direccion y dramaturgia',
      'Coordina procesos de ensayo y desarrollo dramaturgico dentro del grupo.',
      '/images/about/member-camila.svg',
      1,
      true
    ),
    (
      'Julian Rivas',
      'Actuacion',
      'Integra el elenco estable y participa del trabajo de construccion escenica.',
      '/images/about/member-julian.svg',
      2,
      true
    ),
    (
      'Lucia Ferreyra',
      'Produccion',
      'Acompana la gestion de funciones, prensa y articulacion con espacios culturales.',
      '/images/about/member-lucia.svg',
      3,
      true
    )
) as seed(name, role, bio, image_url, sort_order, is_active)
where not exists (
  select 1
  from public.members m
  where lower(m.name) = lower(seed.name)
);

insert into public.works (
  slug,
  title,
  short_description,
  full_description,
  genre,
  duration_minutes,
  status,
  director,
  "cast",
  cover_image_url,
  featured,
  is_published,
  sort_order
)
select
  seed.slug,
  seed.title,
  seed.short_description,
  seed.full_description,
  seed.genre,
  seed.duration_minutes,
  seed.status::public.work_status,
  seed.director,
  seed.cast_members,
  seed.cover_image_url,
  seed.featured,
  seed.is_published,
  seed.sort_order
from (
  values
    (
      'lo-que-queda-del-aplauso',
      'Lo que queda del aplauso',
      'Una obra sobre el eco de la escena cuando la funcion ya termino.',
      'Una pieza que trabaja sobre la memoria del escenario, el desgaste del oficio y la necesidad de volver a encontrarse con el publico.',
      'Drama contemporaneo',
      75,
      'active',
      'Camila Soria',
      array['Camila Soria', 'Julian Rivas', 'Lucia Ferreyra']::text[],
      '/images/works/poster-aplauso.svg',
      true,
      true,
      1
    ),
    (
      'manual-para-volver-a-escena',
      'Manual para volver a escena',
      'Una obra de grupo que mezcla humor, ensayo y fragilidad compartida.',
      'La obra explora la idea de reinicio, los cuerpos en proceso y la insistencia de seguir haciendo teatro incluso cuando todo parece correrse de lugar.',
      'Comedia dramatica',
      70,
      'active',
      'Camila Soria',
      array['Julian Rivas', 'Lucia Ferreyra']::text[],
      '/images/works/poster-manual.svg',
      false,
      true,
      2
    )
) as seed(
  slug,
  title,
  short_description,
  full_description,
  genre,
  duration_minutes,
  status,
  director,
  cast_members,
  cover_image_url,
  featured,
  is_published,
  sort_order
)
where not exists (
  select 1
  from public.works w
  where lower(w.slug) = lower(seed.slug)
);

insert into public.work_gallery (
  work_id,
  image_url,
  alt_text,
  sort_order
)
select
  w.id,
  seed.image_url,
  seed.alt_text,
  seed.sort_order
from (
  values
    (
      'lo-que-queda-del-aplauso',
      '/images/works/gallery-backstage.svg',
      'Backstage de Lo que queda del aplauso',
      1
    ),
    (
      'lo-que-queda-del-aplauso',
      '/images/works/gallery-spotlight.svg',
      'Escena de Lo que queda del aplauso',
      2
    ),
    (
      'manual-para-volver-a-escena',
      '/images/works/gallery-ensemble.svg',
      'Elenco de Manual para volver a escena',
      1
    )
) as seed(work_slug, image_url, alt_text, sort_order)
join public.works w
  on lower(w.slug) = lower(seed.work_slug)
where not exists (
  select 1
  from public.work_gallery wg
  where wg.work_id = w.id
    and wg.image_url = seed.image_url
);

insert into public.functions (
  work_id,
  starts_at,
  venue_name,
  venue_address,
  reservation_url,
  ticket_price_text,
  is_active
)
select
  w.id,
  seed.starts_at::timestamptz,
  seed.venue_name,
  seed.venue_address,
  seed.reservation_url,
  seed.ticket_price_text,
  seed.is_active
from (
  values
    (
      'lo-que-queda-del-aplauso',
      '2026-04-18T21:00:00-03:00',
      'Pasaje Dardo Rocha',
      'Calle 50 entre 6 y 7, La Plata',
      'https://example.com/reservas/aplauso-abril',
      '$12.000',
      true
    ),
    (
      'manual-para-volver-a-escena',
      '2026-05-15T21:30:00-03:00',
      'Sala Giratoria',
      'Estados Unidos 1265, Buenos Aires',
      null,
      '$10.000',
      true
    )
) as seed(
  work_slug,
  starts_at,
  venue_name,
  venue_address,
  reservation_url,
  ticket_price_text,
  is_active
)
join public.works w
  on lower(w.slug) = lower(seed.work_slug)
where not exists (
  select 1
  from public.functions f
  where f.work_id = w.id
    and f.starts_at = seed.starts_at::timestamptz
    and f.venue_name = seed.venue_name
);

insert into public.news_posts (
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  category,
  featured,
  is_published,
  published_at
)
select
  seed.slug,
  seed.title,
  seed.excerpt,
  seed.content,
  seed.cover_image_url,
  seed.category::public.news_category,
  seed.featured,
  seed.is_published,
  seed.published_at::timestamptz
from (
  values
    (
      'lo-que-queda-del-aplauso-abre-la-temporada-2026',
      'Lo que queda del aplauso abre la temporada 2026',
      'VdN anuncia el regreso de una de sus obras al circuito de funciones de La Plata.',
      'La nueva temporada abre con una funcion de Lo que queda del aplauso y marca el inicio de una agenda pensada para sostener circulacion, encuentros y nuevas fechas.',
      '/images/news/news-cover-estreno-aplauso.svg',
      'estreno',
      true,
      true,
      '2026-03-10T10:00:00-03:00'
    ),
    (
      'abre-el-taller-cuerpo-ritmo-y-presencia',
      'Abre el taller Cuerpo, ritmo y presencia',
      'Una propuesta de entrenamiento y escena abierta a nuevos cruces con la comunidad.',
      'El grupo presenta un espacio de trabajo orientado a presencia escenica, ritmo corporal y herramientas de ensayo para personas con o sin experiencia previa.',
      '/images/news/news-cover-taller-presencia.svg',
      'taller',
      false,
      true,
      '2026-03-05T18:00:00-03:00'
    )
) as seed(
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  category,
  featured,
  is_published,
  published_at
)
where not exists (
  select 1
  from public.news_posts n
  where lower(n.slug) = lower(seed.slug)
);
