-- Fix Foreign Key Constraints for Orders
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_buyer_id_fkey,
DROP CONSTRAINT IF EXISTS orders_seller_id_fkey,
DROP CONSTRAINT IF EXISTS orders_product_id_fkey;

ALTER TABLE public.orders
ADD CONSTRAINT orders_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.profiles(id),
ADD CONSTRAINT orders_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profiles(id),
ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);

-- Fix Foreign Key Constraints for Messages
ALTER TABLE public.messages
DROP CONSTRAINT IF EXISTS messages_sender_id_fkey,
DROP CONSTRAINT IF EXISTS messages_receiver_id_fkey,
DROP CONSTRAINT IF EXISTS messages_product_id_fkey;

ALTER TABLE public.messages
ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id),
ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.profiles(id),
ADD CONSTRAINT messages_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);

-- Ensure RLS is enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can see their own orders (buyer or seller)." ON public.orders;
DROP POLICY IF EXISTS "Buyers can create orders." ON public.orders;
DROP POLICY IF EXISTS "Sellers and Buyers can update order status." ON public.orders;
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can send messages" ON public.messages;
DROP POLICY IF EXISTS "Users can see messages sent to or from them." ON public.messages;
DROP POLICY IF EXISTS "Users can insert messages." ON public.messages;


-- Re-create Orders Policies
CREATE POLICY "Users can see their own orders (buyer or seller)."
ON public.orders FOR SELECT
USING ( auth.uid() = buyer_id OR auth.uid() = seller_id );

CREATE POLICY "Buyers can create orders."
ON public.orders FOR INSERT
WITH CHECK ( auth.uid() = buyer_id );

CREATE POLICY "Sellers and Buyers can update order status."
ON public.orders FOR UPDATE
USING ( auth.uid() = buyer_id OR auth.uid() = seller_id );

-- Re-create Messages Policies
CREATE POLICY "Users can see messages sent to or from them."
ON public.messages FOR SELECT
USING ( auth.uid() = sender_id OR auth.uid() = receiver_id );

CREATE POLICY "Users can insert messages."
ON public.messages FOR INSERT
WITH CHECK ( auth.uid() = sender_id );

-- Enable Realtime for Messages
alter publication supabase_realtime add table messages;
