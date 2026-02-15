-- Create a view to easily see User Emails and their Roles
-- This joins the auth.users table (email) with the public.profiles table (role)

CREATE OR REPLACE VIEW public.users_with_roles AS
SELECT 
    au.email,
    p.role,
    p.full_name,
    p.phone_number,
    p.province,
    au.created_at,
    au.last_sign_in_at
FROM 
    auth.users au
JOIN 
    public.profiles p ON au.id = p.id;

-- Grant access to this view (adjust as needed, typically dashboard users are postgres/admin)
GRANT SELECT ON public.users_with_roles TO postgres, service_role, anon, authenticated;

COMMENT ON VIEW public.users_with_roles IS 'View combining Auth credentials with Profile details for easy administration';
