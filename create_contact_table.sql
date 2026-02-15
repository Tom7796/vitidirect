-- Ensure UUID extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL, -- Farmer, Hotel Manager, Driver, Other
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status TEXT DEFAULT 'new' -- new, read, responded
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including unauthenticated) to insert messages
CREATE POLICY "Anyone can insert contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Allow only admins to view messages (but for now we might not have admin role set up fully, 
-- or we can just allow authenticated users to view if we had an admin dashboard. 
-- For this demo, let's allow read for now so we can debug, or restrict it.)
-- Let's restrict to service_role or potential future admin. 
-- For now, let's just allow INSERT publically.
