-- First-pass public bucket for editorial images used across works, news,
-- members and group content. The database stores the object path; the app
-- resolves the public URL at render time.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'media',
  'media',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "media_public_read"
on storage.objects
for select
to public
using (bucket_id = 'media');

create policy "media_authenticated_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'media');

create policy "media_authenticated_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'media')
with check (bucket_id = 'media');

create policy "media_authenticated_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'media');
