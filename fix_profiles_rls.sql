-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. READ ACCESS
-- Allow users to view any profile. This is necessary for:
-- - Marketplace: Viewing seller details
-- - Messaging: Viewing chat partner details
-- - Navbar: Viewing own role (if not in metadata) or others' roles
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING ( true );

-- 2. UPDATE ACCESS
-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING ( auth.uid() = id );

-- 3. INSERT ACCESS
-- Handled by Trigger usually, but if client needs to insert (rare if using trigger):
-- CREATE POLICY "Users can insert their own profile" ...
-- We'll leave insert to the service_role/trigger for now to be safe.
