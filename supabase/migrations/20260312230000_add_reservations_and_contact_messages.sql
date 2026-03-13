create type public.reservation_status as enum (
  'pending',
  'confirmed',
  'cancelled'
);

alter table public.functions
  alter column reservation_url drop not null;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  function_id uuid not null references public.functions(id) on delete cascade,
  work_id uuid not null references public.works(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  quantity integer not null check (quantity > 0),
  message text,
  status public.reservation_status not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create index reservations_created_at_idx
  on public.reservations (created_at desc);

create index reservations_function_created_at_idx
  on public.reservations (function_id, created_at desc);

create index reservations_status_created_at_idx
  on public.reservations (status, created_at desc);

comment on table public.contact_messages is
  'Inbound general contact messages sent from the public contact page.';

comment on table public.reservations is
  'Internal reservation requests for functions that do not use an external reservation URL.';

alter table public.contact_messages enable row level security;
alter table public.reservations enable row level security;

create policy "contact_messages_public_insert"
on public.contact_messages
for insert
to anon
with check (true);

create policy "contact_messages_authenticated_manage"
on public.contact_messages
for all
to authenticated
using (true)
with check (true);

create policy "reservations_public_insert"
on public.reservations
for insert
to anon
with check (
  exists (
    select 1
    from public.functions
    join public.works
      on public.works.id = public.functions.work_id
    where public.functions.id = public.reservations.function_id
      and public.functions.work_id = public.reservations.work_id
      and public.functions.is_active = true
      and public.functions.starts_at >= timezone('utc', now())
      and public.functions.reservation_url is null
      and public.works.is_published = true
  )
);

create policy "reservations_authenticated_manage"
on public.reservations
for all
to authenticated
using (true)
with check (true);
