-- Populate profiles table with demo user data matching auth.users
INSERT INTO public.profiles (user_id, email, full_name, phone, nationality, user_type, created_at, updated_at)
VALUES 
  ('5c104acb-e9fe-4a07-b88b-c4ab6b5b8567', 'guest@umrahasan.com', 'Ahmed Al-Mahmoud', '+966501234567', 'Saudi Arabia', 'guest', now(), now()),
  ('fe1d4ebe-261f-4ce0-aeaf-1e162e999fae', 'partner@umrahasan.com', 'Omar Hotels Group', '+966501234569', 'Saudi Arabia', 'partner', now(), now()),
  ('caac0064-9636-45ab-838c-d9a56d870edc', 'admin@umrahasan.com', 'Sara Al-Admin', '+966501234568', 'Saudi Arabia', 'admin', now(), now());