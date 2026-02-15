-- Fix Products RLS (Version 2 - Idempotent)

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 1. READ ACCESS
DROP POLICY IF EXISTS "Public products are viewable by everyone" ON public.products;
CREATE POLICY "Public products are viewable by everyone"
ON public.products FOR SELECT
USING ( true );

-- 2. INSERT ACCESS
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
CREATE POLICY "Authenticated users can insert products"
ON public.products FOR INSERT
WITH CHECK ( auth.role() = 'authenticated' AND auth.uid() = seller_id );

-- 3. UPDATE ACCESS
DROP POLICY IF EXISTS "Sellers can update own products" ON public.products;
CREATE POLICY "Sellers can update own products"
ON public.products FOR UPDATE
USING ( auth.uid() = seller_id );

-- 4. DELETE ACCESS
DROP POLICY IF EXISTS "Sellers can delete own products" ON public.products;
CREATE POLICY "Sellers can delete own products"
ON public.products FOR DELETE
USING ( auth.uid() = seller_id );
