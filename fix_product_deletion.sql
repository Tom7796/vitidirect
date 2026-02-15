-- Fix Product Deletion by adding ON DELETE CASCADE to orders foreign key

-- Drop the existing constraint
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_product_id_fkey;

-- Add the new constraint with ON DELETE CASCADE
-- This ensures that when a product is deleted, all associated orders are also removed.
ALTER TABLE public.orders
ADD CONSTRAINT orders_product_id_fkey
    FOREIGN KEY (product_id)
    REFERENCES public.products(id)
    ON DELETE CASCADE;
