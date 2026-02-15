-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 1. READ ACCESS
-- Allow everyone to view products (marketplace is public)
CREATE POLICY "Public products are viewable by everyone"
ON public.products FOR SELECT
USING ( true );

-- 2. INSERT ACCESS
-- Allow authenticated users to insert products (Farmers)
CREATE POLICY "Authenticated users can insert products"
ON public.products FOR INSERT
WITH CHECK ( auth.role() = 'authenticated' AND auth.uid() = seller_id );

-- 3. UPDATE ACCESS
-- Allow sellers to update their own products
CREATE POLICY "Sellers can update own products"
ON public.products FOR UPDATE
USING ( auth.uid() = seller_id );

-- 4. DELETE ACCESS
-- Allow sellers to delete their own products
CREATE POLICY "Sellers can delete own products"
ON public.products FOR DELETE
USING ( auth.uid() = seller_id );
