-- Create comprehensive demo data for testing all portal functions
-- Using correct city names that match the constraint

-- First, let's create some sample hotels in different cities
INSERT INTO public.hotels (name, description, city, category, distance_from_haram, amenities, images, is_active, created_at, updated_at) VALUES 
(
  'Makkah Grand Hotel',
  'Luxurious 5-star hotel located just 100 meters from the Holy Haram. Features spacious rooms with Haram views, premium amenities, and dedicated prayer areas.',
  'makkah',
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
  'madina',
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
  'makkah',
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
  'makkah',
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
  'madina',
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