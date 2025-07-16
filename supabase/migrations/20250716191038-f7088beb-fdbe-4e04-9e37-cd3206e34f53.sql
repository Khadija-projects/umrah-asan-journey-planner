-- Create comprehensive demo data for testing all portal functions

-- First, let's create some sample hotels in different cities
INSERT INTO public.hotels (name, description, city, category, distance_from_haram, amenities, images, is_active, created_at, updated_at) VALUES 
(
  'Makkah Grand Hotel',
  'Luxurious 5-star hotel located just 100 meters from the Holy Haram. Features spacious rooms with Haram views, premium amenities, and dedicated prayer areas.',
  'Makkah',
  5,
  100,
  '["Free WiFi", "Air Conditioning", "24/7 Room Service", "Prayer Area", "Shuttle Service", "Haram View", "Fitness Center", "Restaurant"]'::jsonb,
  '["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"]'::jsonb,
  true,
  now(),
  now()
),
(
  'Madinah Serenity Suites',
  'Premium hotel near the Prophet''s Mosque offering comfortable accommodations for pilgrims with modern amenities and traditional hospitality.',
  'Madinah',
  4,
  150,
  '["Free WiFi", "Air Conditioning", "Buffet Breakfast", "Prayer Area", "Laundry Service", "Conference Room"]'::jsonb,
  '["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"]'::jsonb,
  true,
  now(),
  now()
),
(
  'Al-Noor Residence Makkah',
  'Budget-friendly accommodation perfect for families and groups. Clean, comfortable rooms with essential amenities at affordable prices.',
  'Makkah',
  3,
  300,
  '["Free WiFi", "Air Conditioning", "24/7 Reception", "Prayer Area", "Kitchen Facilities"]'::jsonb,
  '["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800", "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800"]'::jsonb,
  true,
  now(),
  now()
),
(
  'Hilton Suites Makkah',
  'International standard hotel with world-class amenities. Features multiple dining options, spa services, and premium Haram-facing rooms.',
  'Makkah',
  5,
  250,
  '["Free WiFi", "Air Conditioning", "Spa", "Multiple Restaurants", "Room Service", "Business Center", "Concierge"]'::jsonb,
  '["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"]'::jsonb,
  true,
  now(),
  now()
),
(
  'Madinah Palace Hotel',
  'Historic hotel combining traditional Arabic architecture with modern comfort. Walking distance to the Prophet''s Mosque.',
  'Madinah',
  4,
  200,
  '["Free WiFi", "Air Conditioning", "Traditional Decor", "Restaurant", "Prayer Area", "Gift Shop"]'::jsonb,
  '["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"]'::jsonb,
  true,
  now(),
  now()
);

-- Create rooms for each hotel with different types and pricing
-- Makkah Grand Hotel rooms
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'Standard Double', 2, 350.00, 15, now(), now() FROM public.hotels h WHERE h.name = 'Makkah Grand Hotel'
UNION ALL
SELECT h.id, 'Deluxe Haram View', 2, 500.00, 10, now(), now() FROM public.hotels h WHERE h.name = 'Makkah Grand Hotel'
UNION ALL
SELECT h.id, 'Family Suite', 4, 750.00, 8, now(), now() FROM public.hotels h WHERE h.name = 'Makkah Grand Hotel'
UNION ALL
SELECT h.id, 'Quad Room', 4, 600.00, 12, now(), now() FROM public.hotels h WHERE h.name = 'Makkah Grand Hotel';

-- Madinah Serenity Suites rooms
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'Standard Room', 2, 200.00, 20, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Serenity Suites'
UNION ALL
SELECT h.id, 'Superior Room', 2, 280.00, 15, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Serenity Suites'
UNION ALL
SELECT h.id, 'Family Room', 4, 400.00, 10, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Serenity Suites';

-- Al-Noor Residence rooms (budget option)
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'Economy Room', 2, 120.00, 25, now(), now() FROM public.hotels h WHERE h.name = 'Al-Noor Residence Makkah'
UNION ALL
SELECT h.id, 'Standard Room', 2, 150.00, 20, now(), now() FROM public.hotels h WHERE h.name = 'Al-Noor Residence Makkah'
UNION ALL
SELECT h.id, 'Family Room', 6, 250.00, 8, now(), now() FROM public.hotels h WHERE h.name = 'Al-Noor Residence Makkah';

-- Hilton Suites rooms (luxury option)
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'Executive Room', 2, 450.00, 12, now(), now() FROM public.hotels h WHERE h.name = 'Hilton Suites Makkah'
UNION ALL
SELECT h.id, 'Premium Haram View', 2, 650.00, 8, now(), now() FROM public.hotels h WHERE h.name = 'Hilton Suites Makkah'
UNION ALL
SELECT h.id, 'Presidential Suite', 4, 1200.00, 3, now(), now() FROM public.hotels h WHERE h.name = 'Hilton Suites Makkah';

-- Madinah Palace Hotel rooms
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms, created_at, updated_at)
SELECT h.id, 'Classic Room', 2, 180.00, 18, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Palace Hotel'
UNION ALL
SELECT h.id, 'Deluxe Room', 2, 250.00, 12, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Palace Hotel'
UNION ALL
SELECT h.id, 'Royal Suite', 4, 500.00, 5, now(), now() FROM public.hotels h WHERE h.name = 'Madinah Palace Hotel';

-- Create temporary demo profiles that will be linked to auth users when they sign up
-- These will store demo data that can be used immediately for testing
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
('partner@umrahasan.com', 'Omar Hotels Group', '+966501234569', 'Saudi Arabia', 'partner', 'Premium Hospitality Group');

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
('guest@umrahasan.com', 'Makkah Grand Hotel', 'Deluxe Haram View', CURRENT_DATE + INTERVAL '15 days', CURRENT_DATE + INTERVAL '20 days', 1, 2, 2500.00, 'confirmed', 'Quiet room preferred, close to elevator', 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8))),
('guest@umrahasan.com', 'Madinah Serenity Suites', 'Superior Room', CURRENT_DATE + INTERVAL '21 days', CURRENT_DATE + INTERVAL '25 days', 1, 2, 1120.00, 'pending', 'Early check-in requested', 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8))),
('guest@umrahasan.com', 'Al-Noor Residence Makkah', 'Family Room', CURRENT_DATE + INTERVAL '40 days', CURRENT_DATE + INTERVAL '45 days', 1, 4, 1250.00, 'confirmed', 'Family with children, ground floor preferred', 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8)));

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
('partner@umrahasan.com', 'Premium Hospitality Group', 'Omar Al-Masri', '+966501234569', 'LIC-2024-PHG-001', 'approved');

-- Create a function to link demo data when users sign up
CREATE OR REPLACE FUNCTION link_demo_data_to_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is a demo user
  IF EXISTS (SELECT 1 FROM demo_user_data WHERE email = NEW.email) THEN
    -- Update the profile with demo data
    UPDATE profiles SET
      full_name = (SELECT full_name FROM demo_user_data WHERE email = NEW.email),
      phone = (SELECT phone FROM demo_user_data WHERE email = NEW.email),
      nationality = (SELECT nationality FROM demo_user_data WHERE email = NEW.email),
      user_type = (SELECT user_type FROM demo_user_data WHERE email = NEW.email)
    WHERE user_id = NEW.user_id;

    -- If this is a partner, create partner registration
    IF (SELECT user_type FROM demo_user_data WHERE email = NEW.email) = 'partner' THEN
      INSERT INTO partner_registrations (user_id, company_name, contact_person, email, phone, business_license, status, approved_at)
      SELECT NEW.user_id, company_name, full_name, email, phone, 'DEMO-LICENSE-001', 'approved', now()
      FROM demo_user_data WHERE email = NEW.email;
    END IF;

    -- If this is a guest, create their bookings
    IF (SELECT user_type FROM demo_user_data WHERE email = NEW.email) = 'guest' THEN
      INSERT INTO bookings (guest_id, hotel_id, room_id, check_in_date, check_out_date, num_rooms, num_guests, total_amount, payment_status, special_requests, booking_reference)
      SELECT 
        NEW.id,
        h.id,
        r.id,
        db.check_in_date,
        db.check_out_date,
        db.num_rooms,
        db.num_guests,
        db.total_amount,
        db.payment_status,
        db.special_requests,
        db.booking_reference
      FROM demo_bookings db
      JOIN hotels h ON h.name = db.hotel_name
      JOIN rooms r ON r.hotel_id = h.id AND r.room_type = db.room_type
      WHERE db.guest_email = NEW.email;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically link demo data when profiles are created
DROP TRIGGER IF EXISTS link_demo_data_trigger ON profiles;
CREATE TRIGGER link_demo_data_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION link_demo_data_to_user();