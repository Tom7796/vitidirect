-- Fix Marketplace Join Error
-- The marketplace query tries to join 'products' with 'profiles'. 
-- This requires a Foreign Key specifically between 'products' and 'profiles'.
-- Currently, 'products' references 'auth.users'. We need to redirect it to 'public.profiles'.

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_seller_id_fkey;

ALTER TABLE public.products
ADD CONSTRAINT products_seller_id_fkey
    FOREIGN KEY (seller_id)
    REFERENCES public.profiles(id)
    ON DELETE CASCADE;

-- Also verify orders FK just in case, though orders usually reference auth.users for buyer_id. 
-- For seller_id in orders, it might also check profiles? 
-- Let's stick to just fixing products for now as that's the immediate error.
