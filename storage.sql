-- Enable the storage extension if not already enabled (usually enabled by default)
-- create extension if not exists "storage";

-- 1. Create the 'avatars' bucket (Public)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 2. Create the 'products' bucket (Public)
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- 3. Set up RLS Policies for 'avatars'

-- Allow public access to view avatars
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload avatars
create policy "Authenticated users can upload avatars."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

-- Allow users to update their own avatars (optional, depends on file naming strategy)
-- For simplicity, we often just upload new files.

-- 4. Set up RLS Policies for 'products'

-- Allow public access to view product images
create policy "Product images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'products' );

-- Allow authenticated users to upload product images
create policy "Authenticated users can upload product images."
  on storage.objects for insert
  with check ( bucket_id = 'products' AND auth.role() = 'authenticated' );
