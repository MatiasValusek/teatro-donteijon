create extension if not exists pgcrypto;

create type public.work_status as enum ('active', 'archive');
create type public.news_category as enum (
  'estreno',
  'festival',
  'taller',
  'prensa',
  'anuncio'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.group_info (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text not null,
  subtitle text not null,
  history text[] not null default '{}',
  manifesto text[] not null default '{}',
  highlighted_quote text not null,
  hero_image_url text not null,
  hero_image_alt text not null,
  history_image_url text not null,
  history_image_alt text not null,
  contact_email text not null,
  press_email text,
  instagram_url text not null,
  phone text,
  city text not null,
  focus_areas text[] not null default '{}',
  manifesto_pillars text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index group_info_singleton_idx on public.group_info ((true));

create table public.group_milestones (
  id uuid primary key default gen_random_uuid(),
  group_info_id uuid not null references public.group_info(id) on delete cascade,
  label text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index group_milestones_group_sort_idx
  on public.group_milestones (group_info_id, sort_order, created_at);

create table public.group_gallery (
  id uuid primary key default gen_random_uuid(),
  group_info_id uuid not null references public.group_info(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  caption text not null,
  category text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index group_gallery_group_sort_idx
  on public.group_gallery (group_info_id, sort_order, created_at);

create table public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  image_url text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index members_active_sort_idx
  on public.members (is_active, sort_order, name);

create table public.works (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  short_description text not null,
  full_description text not null,
  genre text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  status public.work_status not null default 'active',
  director text not null,
  cast text[] not null default '{}',
  cover_image_url text not null,
  cover_image_alt text not null,
  featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  artistic_text text,
  technical_sheet text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index works_slug_lower_uidx on public.works (lower(slug));
create index works_public_listing_idx
  on public.works (is_published, status, featured, sort_order, title);

create table public.work_gallery (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.works(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index work_gallery_work_sort_idx
  on public.work_gallery (work_id, sort_order, created_at);

create table public.functions (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.works(id) on delete cascade,
  starts_at timestamptz not null,
  venue_name text not null,
  venue_address text not null,
  reservation_url text not null,
  ticket_price_text text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index functions_work_starts_at_idx
  on public.functions (work_id, starts_at);

create index functions_active_starts_at_idx
  on public.functions (starts_at)
  where is_active = true;

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text not null,
  cover_image_alt text not null,
  category public.news_category not null,
  featured boolean not null default false,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint news_posts_published_at_check
    check (is_published = false or published_at is not null)
);

create unique index news_posts_slug_lower_uidx
  on public.news_posts (lower(slug));

create index news_posts_public_listing_idx
  on public.news_posts (is_published, published_at desc, featured);

create table public.news_gallery (
  id uuid primary key default gen_random_uuid(),
  news_post_id uuid not null references public.news_posts(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index news_gallery_post_sort_idx
  on public.news_gallery (news_post_id, sort_order, created_at);

create trigger set_group_info_updated_at
before update on public.group_info
for each row
execute function public.set_updated_at();

create trigger set_members_updated_at
before update on public.members
for each row
execute function public.set_updated_at();

create trigger set_works_updated_at
before update on public.works
for each row
execute function public.set_updated_at();

create trigger set_functions_updated_at
before update on public.functions
for each row
execute function public.set_updated_at();

create trigger set_news_posts_updated_at
before update on public.news_posts
for each row
execute function public.set_updated_at();

comment on table public.group_info is
  'Singleton table for the public identity, contact details and editorial copy of Vamos de Nuevo.';

comment on table public.group_gallery is
  'Ordered gallery used by the /nosotros page.';

comment on table public.news_gallery is
  'Optional editorial gallery for news detail pages.';
