-- Create comprehensive demo data for testing all portal functions
-- Using correct room types that match the constraint: 'double', 'quad', 'multi_sharing'

-- Create rooms for each hotel with valid room types and pricing
-- Makkah Grand Hotel rooms
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'double', 2, 350.00, 15, now(), now() FROM public.hotels h WHERE h.name = 'Makkah Grand Hotel'
UNION ALL
SELECT h.id, 'quad', 4, 600.00, 12, now(), now() FROM public.hotels h WHERE h.name = 'Makkah Grand Hotel'
UNION ALL
SELECT h.id, 'multi_sharing', 8, 800.00, 8, now(), now() FROM public.hotels h WHERE h.name = 'Makkah Grand Hotel';

-- Madinah Serenity Suites rooms
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'double', 2, 200.00, 20, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Serenity Suites'
UNION ALL
SELECT h.id, 'quad', 4, 400.00, 15, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Serenity Suites'
UNION ALL
SELECT h.id, 'multi_sharing', 8, 650.00, 10, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Serenity Suites';

-- Al-Noor Residence rooms (budget option)
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'double', 2, 120.00, 25, now(), now() FROM public.hotels h WHERE h.name = 'Al-Noor Residence Makkah'
UNION ALL
SELECT h.id, 'quad', 4, 200.00, 20, now(), now() FROM public.hotels h WHERE h.name = 'Al-Noor Residence Makkah'
UNION ALL
SELECT h.id, 'multi_sharing', 8, 300.00, 15, now(), now() FROM public.hotels h WHERE h.name = 'Al-Noor Residence Makkah';

-- Hilton Suites rooms (luxury option)
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'double', 2, 450.00, 12, now(), now() FROM public.hotels h WHERE h.name = 'Hilton Suites Makkah'
UNION ALL
SELECT h.id, 'quad', 4, 750.00, 8, now(), now() FROM public.hotels h WHERE h.name = 'Hilton Suites Makkah'
UNION ALL
SELECT h.id, 'multi_sharing', 8, 1200.00, 5, now(), now() FROM public.hotels h WHERE h.name = 'Hilton Suites Makkah';

-- Madinah Palace Hotel rooms
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'double', 2, 180.00, 18, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Palace Hotel'
UNION ALL
SELECT h.id, 'quad', 4, 320.00, 12, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Palace Hotel'
UNION ALL
SELECT h.id, 'multi_sharing', 8, 500.00, 8, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Palace Hotel';

-- Create temporary demo profiles that will be linked to auth users when they sign up
CREATE TABLE IF NOT EXISTS demo_user_data (
  email TEXT PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  nationality TEXT,
  user_type TEXT,
  company_name TEXT, -- for partners
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO demo_user_data (email, full_name, phone, nationality, user_type, company_name) VALUES
('guest@umrahasan.com', 'Ahmed Al-Mahmoud', '+966501234567', 'Saudi Arabia', 'guest', NULL),
('admin@umrahasan.com', 'Sara Al-Admin', '+966501234568', 'Saudi Arabia', 'admin', NULL),
('partner@umrahasan.com', 'Omar Hotels Group', '+966501234569', 'Saudi Arabia', 'partner', 'Premium Hospitality Group')
ON CONFLICT (email) DO NOTHING;

-- Create some sample bookings that will be assigned to demo users when they sign up
CREATE TABLE IF NOT EXISTS demo_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_email TEXT,
  hotel_name TEXT,
  room_type TEXT,
  check_in_date DATE,
  check_out_date DATE,
  num_rooms INTEGER,
  num_guests INTEGER,
  total_amount NUMERIC,
  payment_status TEXT DEFAULT 'confirmed',
  special_requests TEXT,
  booking_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO demo_bookings (guest_email, hotel_name, room_type, check_in_date, check_out_date, num_rooms, num_guests, total_amount, payment_status, special_requests, booking_reference) VALUES
('guest@umrahasan.com', 'Makkah Grand Hotel', 'double', CURRENT_DATE + INTERVAL '15 days', CURRENT_DATE + INTERVAL '20 days', 1, 2, 1750.00, 'confirmed', 'Quiet room preferred, close to elevator', 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8))),
('guest@umrahasan.com', 'Madinah Serenity Suites', 'quad', CURRENT_DATE + INTERVAL '21 days', CURRENT_DATE + INTERVAL '25 days', 1, 4, 1600.00, 'pending', 'Early check-in requested', 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8))),
('guest@umrahasan.com', 'Al-Noor Residence Makkah', 'multi_sharing', CURRENT_DATE + INTERVAL '40 days', CURRENT_DATE + INTERVAL '45 days', 1, 6, 1500.00, 'confirmed', 'Family with children, ground floor preferred', 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8)));

-- Add some partner registration data
CREATE TABLE IF NOT EXISTS demo_partner_registrations (
  partner_email TEXT PRIMARY KEY,
  company_name TEXT,
  contact_person TEXT,
  phone TEXT,
  business_license TEXT,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO demo_partner_registrations (partner_email, company_name, contact_person, phone, business_license, status) VALUES
('partner@umrahasan.com', 'Premium Hospitality Group', 'Omar Al-Masri', '+966501234569', 'LIC-2024-PHG-001', 'approved')
ON CONFLICT (partner_email) DO NOTHING;