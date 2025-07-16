-- Create demo accounts for testing different user types

-- First, we need to insert users manually into auth.users since we can't use the auth API in SQL
-- These would normally be created through the signup process, but for demo purposes we'll add them here

-- Insert demo guest user profile
INSERT INTO public.profiles (user_id, email, full_name, phone, nationality, user_type, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'guest@umrahasan.com', 'Demo Guest User', '+966123456789', 'Saudi Arabia', 'guest', now(), now()),
  (gen_random_uuid(), 'admin@umrahasan.com', 'Demo Admin User', '+966123456788', 'Saudi Arabia', 'admin', now(), now()),
  (gen_random_uuid(), 'partner@umrahasan.com', 'Demo Partner User', '+966123456787', 'Saudi Arabia', 'partner', now(), now())
ON CONFLICT (user_id) DO NOTHING;

-- Insert partner registration for the demo partner
INSERT INTO public.partner_registrations (user_id, company_name, contact_person, email, phone, business_license, status, approved_at, created_at)
SELECT 
  p.user_id,
  'Demo Hotel Company',
  'Demo Partner User',
  'partner@umrahasan.com',
  '+966123456787',
  'Demo License 12345',
  'approved',
  now(),
  now()
FROM public.profiles p 
WHERE p.email = 'partner@umrahasan.com'
ON CONFLICT (user_id) DO NOTHING;

-- Create some sample hotels for the demo partner
INSERT INTO public.hotels (name, description, city, category, distance_from_haram, partner_id, amenities, images, is_active, created_at, updated_at)
SELECT 
  'Demo Makkah Hotel',
  'A premium hotel near the Haram with excellent amenities for pilgrims.',
  'Makkah',
  5,
  200,
  p.id,
  '["Free WiFi", "Air Conditioning", "24/7 Room Service", "Prayer Area", "Shuttle Service"]'::jsonb,
  '["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500"]'::jsonb,
  true,
  now(),
  now()
FROM public.profiles p 
WHERE p.email = 'partner@umrahasan.com'
ON CONFLICT DO NOTHING;

-- Add rooms for the demo hotel
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT 
  h.id,
  'Double Room',
  2,
  250.00,
  10,
  now(),
  now()
FROM public.hotels h 
WHERE h.name = 'Demo Makkah Hotel'
ON CONFLICT DO NOTHING;

INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT 
  h.id,
  'Quad Room',
  4,
  400.00,
  5,
  now(),
  now()
FROM public.hotels h 
WHERE h.name = 'Demo Makkah Hotel'
ON CONFLICT DO NOTHING;

-- Create a sample booking for the demo guest
INSERT INTO public.bookings (guest_id, hotel_id, room_id, check_in_date, check_out_date, num_rooms, num_guests, total_amount, payment_status, special_requests, created_at, updated_at)
SELECT 
  p.id,
  h.id,
  r.id,
  CURRENT_DATE + INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '35 days',
  1,
  2,
  1250.00,
  'confirmed',
  'Close to elevator, quiet room preferred',
  now(),
  now()
FROM public.profiles p
CROSS JOIN public.hotels h
CROSS JOIN public.rooms r
WHERE p.email = 'guest@umrahasan.com' 
  AND h.name = 'Demo Makkah Hotel'
  AND r.room_type = 'Double Room'
ON CONFLICT DO NOTHING;