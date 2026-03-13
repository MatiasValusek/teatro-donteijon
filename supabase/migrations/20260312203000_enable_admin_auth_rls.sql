-- All authenticated Supabase users are treated as admins until the project
-- adds roles or custom claims.

alter table public.group_info enable row level security;
alter table public.group_milestones enable row level security;
alter table public.group_gallery enable row level security;
alter table public.members enable row level security;
alter table public.works enable row level security;
alter table public.work_gallery enable row level security;
alter table public.functions enable row level security;
alter table public.news_posts enable row level security;
alter table public.news_gallery enable row level security;

create policy "group_info_public_read"
on public.group_info
for select
to anon
using (true);

create policy "group_info_authenticated_manage"
on public.group_info
for all
to authenticated
using (true)
with check (true);

create policy "group_milestones_public_read"
on public.group_milestones
for select
to anon
using (true);

create policy "group_milestones_authenticated_manage"
on public.group_milestones
for all
to authenticated
using (true)
with check (true);

create policy "group_gallery_public_read"
on public.group_gallery
for select
to anon
using (true);

create policy "group_gallery_authenticated_manage"
on public.group_gallery
for all
to authenticated
using (true)
with check (true);

create policy "members_public_read_active"
on public.members
for select
to anon
using (is_active = true);

create policy "members_authenticated_manage"
on public.members
for all
to authenticated
using (true)
with check (true);

create policy "works_public_read_published"
on public.works
for select
to anon
using (is_published = true);

create policy "works_authenticated_manage"
on public.works
for all
to authenticated
using (true)
with check (true);

create policy "work_gallery_public_read_published_parent"
on public.work_gallery
for select
to anon
using (
  exists (
    select 1
    from public.works
    where public.works.id = public.work_gallery.work_id
      and public.works.is_published = true
  )
);

create policy "work_gallery_authenticated_manage"
on public.work_gallery
for all
to authenticated
using (true)
with check (true);

create policy "functions_public_read_active"
on public.functions
for select
to anon
using (is_active = true);

create policy "functions_authenticated_manage"
on public.functions
for all
to authenticated
using (true)
with check (true);

create policy "news_posts_public_read_published"
on public.news_posts
for select
to anon
using (is_published = true);

create policy "news_posts_authenticated_manage"
on public.news_posts
for all
to authenticated
using (true)
with check (true);

create policy "news_gallery_public_read_published_parent"
on public.news_gallery
for select
to anon
using (
  exists (
    select 1
    from public.news_posts
    where public.news_posts.id = public.news_gallery.news_post_id
      and public.news_posts.is_published = true
  )
);

create policy "news_gallery_authenticated_manage"
on public.news_gallery
for all
to authenticated
using (true)
with check (true);
