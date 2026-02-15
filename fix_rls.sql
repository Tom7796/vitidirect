-- Enable RLS on tables if not already enabled
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- MESSAGES POLICIES

-- Allow users to view messages sent to them or by them
CREATE POLICY "Users can view their own messages"
ON messages FOR SELECT
USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

-- Allow authenticated users to send messages
CREATE POLICY "Authenticated users can send messages"
ON messages FOR INSERT
WITH CHECK (
  auth.uid() = sender_id
);

-- ORDERS POLICIES

-- Allow users to view orders where they are buyer or seller
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
USING (
  auth.uid() = buyer_id OR auth.uid() = seller_id
);

-- Allow authenticated users to create orders
CREATE POLICY "Authenticated users can create orders"
ON orders FOR INSERT
WITH CHECK (
  auth.uid() = buyer_id
);

-- Allow users to update their orders (e.g. status changes)
-- This is a broad policy, ideally we'd restrict which columns based on role, but for MVP:
CREATE POLICY "Users can update their own orders"
ON orders FOR UPDATE
USING (
  auth.uid() = buyer_id OR auth.uid() = seller_id
);
