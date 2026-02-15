-- Create a function that handles new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    full_name,
    role,
    province,
    phone_number,
    mpaisa_number,
    bank_name,
    account_number,
    has_transport,
    preferred_contact_method,
    avatar_url
  )
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'role',
    new.raw_user_meta_data->>'province',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'mpaisa',
    new.raw_user_meta_data->>'bankName',
    new.raw_user_meta_data->>'accountNumber',
    (new.raw_user_meta_data->>'hasTransport')::boolean,
    new.raw_user_meta_data->>'contactMethod',
    new.raw_user_meta_data->>'avatarUrl'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Ensure storage policies are correct (idempotent)
drop policy if exists "Authenticated users can upload avatars." on storage.objects;
create policy "Authenticated users can upload avatars."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );
