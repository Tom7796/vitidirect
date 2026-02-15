-- Add listing_id column if it doesn't exist
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS listing_id UUID REFERENCES public.products(id);

-- Migration: Copy product_id to listing_id if listing_id is null
UPDATE public.messages SET listing_id = product_id WHERE listing_id IS NULL AND product_id IS NOT NULL;

-- Enable Realtime for messages
-- Note: You might need to check if the publication exists or just run this in the dashboard
-- To do it via SQL:
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
