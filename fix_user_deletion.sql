-- Fix User Deletion by adding ON DELETE CASCADE to foreign keys

-- 1. Profiles
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_id_fkey
    FOREIGN KEY (id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 2. Products
-- Assuming standard naming constraint: products_seller_id_fkey
ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_seller_id_fkey;

ALTER TABLE public.products
ADD CONSTRAINT products_seller_id_fkey
    FOREIGN KEY (seller_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 3. Orders
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_buyer_id_fkey;

ALTER TABLE public.orders
ADD CONSTRAINT orders_buyer_id_fkey
    FOREIGN KEY (buyer_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_seller_id_fkey;

ALTER TABLE public.orders
ADD CONSTRAINT orders_seller_id_fkey
    FOREIGN KEY (seller_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 4. Messages
ALTER TABLE public.messages
DROP CONSTRAINT IF EXISTS messages_sender_id_fkey;

ALTER TABLE public.messages
ADD CONSTRAINT messages_sender_id_fkey
    FOREIGN KEY (sender_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

ALTER TABLE public.messages
DROP CONSTRAINT IF EXISTS messages_receiver_id_fkey;

ALTER TABLE public.messages
ADD CONSTRAINT messages_receiver_id_fkey
    FOREIGN KEY (receiver_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;
