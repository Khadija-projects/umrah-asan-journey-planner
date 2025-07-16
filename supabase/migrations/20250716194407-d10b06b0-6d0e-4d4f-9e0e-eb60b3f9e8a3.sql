-- Drop all demo-related functions and triggers completely
DROP FUNCTION IF EXISTS public.link_demo_data_to_user() CASCADE;

-- Now create the demo users
-- First, delete any existing conflicting users if they exist
DELETE FROM auth.users WHERE email IN ('guest@umrahasan.com', 'admin@umrahasan.com', 'partner@umrahasan.com');

-- Create guest user
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'guest@umrahasan.com',
  '$2a$10$FdE6E3m0G7Z5Qf8zNpT0hOGJhL5CdE0P8kR6qM3nT9sV2uX7y4wZ1',
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Ahmed Al-Mahmoud", "phone": "+966501234567", "nationality": "Saudi Arabia"}',
  false,
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create admin user
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'admin@umrahasan.com',
  '$2a$10$GfF7F4n1H8A6Rf9aNqU1iOHKiM6DeF1Q9lS7rN4oU0tW3vY8z5xA2',
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Sara Al-Admin", "phone": "+966501234568", "nationality": "Saudi Arabia"}',
  false,
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create partner user
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'partner@umrahasan.com',
  '$2a$10$HgG8G5o2I9B7Sg0bOrV2jOILjN7EfG2R0mT8sO5pV1uX4wZ9a6yB3',
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Omar Hotels Group", "phone": "+966501234569", "nationality": "Saudi Arabia"}',
  false,
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create corresponding profiles
INSERT INTO public.profiles (user_id, email, full_name, phone, nationality, user_type) VALUES
('11111111-1111-1111-1111-111111111111', 'guest@umrahasan.com', 'Ahmed Al-Mahmoud', '+966501234567', 'Saudi Arabia', 'guest'),
('22222222-2222-2222-2222-222222222222', 'admin@umrahasan.com', 'Sara Al-Admin', '+966501234568', 'Saudi Arabia', 'admin'),
('33333333-3333-3333-3333-333333333333', 'partner@umrahasan.com', 'Omar Hotels Group', '+966501234569', 'Saudi Arabia', 'partner');

-- Create partner registration for demo partner
INSERT INTO public.partner_registrations (user_id, company_name, contact_person, email, phone, business_license, status, approved_at)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Premium Hospitality Group',
  'Omar Hotels Group',
  'partner@umrahasan.com',
  '+966501234569',
  'LIC-2024-PHG-001',
  'approved',
  now()
);