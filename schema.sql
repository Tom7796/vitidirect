-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  role text check (role in ('farmer', 'middleman', 'buyer')),
  province text,
  phone_number text,
  avatar_url text, -- We will use Supabase Storage for this
  mpaisa_number text,
  bank_name text,
  account_number text,
  has_transport boolean default false,
  preferred_contact_method text check (preferred_contact_method in ('whatsapp', 'phone', 'in_app')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references public.profiles(id) not null,
  title text not null,
  description text,
  price numeric not null,
  unit text not null, -- e.g., 'kg', 'bundle', 'ton'
  grade text, -- e.g., 'A', 'B', 'C'
  province text, -- Copied from profile for easier filtering, or could join
  image_url text not null,
  status text default 'available', -- 'available', 'sold'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Products
alter table public.products enable row level security;

create policy "Products are viewable by everyone."
  on public.products for select
  using ( true );

create policy "Farmers (Sellers) can insert products."
  on public.products for insert
  with check ( auth.uid() = seller_id );
  -- In a real app we might want to check the role in profiles too

create policy "Sellers can update own products."
  on public.products for update
  using ( auth.uid() = seller_id );

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) not null,
  receiver_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id), -- Optional, context from where message started
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Messages
alter table public.messages enable row level security;

create policy "Users can see messages sent to or from them."
  on public.messages for select
  using ( auth.uid() = sender_id or auth.uid() = receiver_id );

create policy "Users can insert messages."
  on public.messages for insert
  with check ( auth.uid() = sender_id );

-- Orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  buyer_id uuid references public.profiles(id) not null,
  seller_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  quantity numeric,
  total_price numeric,
  status text default 'pending', -- pending, confirmed, delivered, received
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Orders
alter table public.orders enable row level security;

create policy "Users can see their own orders (buyer or seller)."
  on public.orders for select
  using ( auth.uid() = buyer_id or auth.uid() = seller_id );

create policy "Buyers can create orders."
  on public.orders for insert
  with check ( auth.uid() = buyer_id );

create policy "Sellers and Buyers can update order status."
  on public.orders for update
  using ( auth.uid() = buyer_id or auth.uid() = seller_id );


-- Storage Buckets (Conceptually, run this in Supabase Dashboard)
-- insert into storage.buckets (id, name) values ('avatars', 'avatars');
-- insert into storage.buckets (id, name) values ('products', 'products');

-- RLS for Storage (simplified)
-- create policy "Avatar images are publicly accessible."
--   on storage.objects for select
--   using ( bucket_id = 'avatars' );

-- create policy "Anyone can upload an avatar."
--   on storage.objects for insert
--   with check ( bucket_id = 'avatars' );

-- create policy "Product images are publicly accessible."
--   on storage.objects for select
--   using ( bucket_id = 'products' );

-- create policy "Anyone can upload a product image."
--   on storage.objects for insert
--   with check ( bucket_id = 'products' );
