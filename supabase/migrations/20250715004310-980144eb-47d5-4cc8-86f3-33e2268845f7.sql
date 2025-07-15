-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  full_name TEXT,
  nationality TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('guest', 'admin', 'partner')) DEFAULT 'guest',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hotels table
CREATE TABLE public.hotels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL CHECK (city IN ('makkah', 'madina')),
  category INTEGER NOT NULL CHECK (category IN (3, 4, 5)),
  distance_from_haram INTEGER NOT NULL, -- in meters
  description TEXT,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  partner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL CHECK (room_type IN ('double', 'quad', 'multi_sharing')),
  max_guests INTEGER NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  available_rooms INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE RESTRICT,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE RESTRICT,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  num_rooms INTEGER NOT NULL DEFAULT 1,
  num_guests INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
  payment_method TEXT DEFAULT 'bank_transfer',
  booking_reference TEXT UNIQUE,
  voucher_url TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner registrations table (for approval workflow)
CREATE TABLE public.partner_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_license TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);

-- Create RLS policies for hotels
CREATE POLICY "Anyone can view active hotels" ON public.hotels
FOR SELECT USING (is_active = true);

CREATE POLICY "Partners can manage their own hotels" ON public.hotels
FOR ALL USING (partner_id = (
  SELECT id FROM public.profiles WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can manage all hotels" ON public.hotels
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);

-- Create RLS policies for rooms
CREATE POLICY "Anyone can view rooms for active hotels" ON public.rooms
FOR SELECT USING (
  hotel_id IN (SELECT id FROM public.hotels WHERE is_active = true)
);

CREATE POLICY "Partners can manage rooms for their hotels" ON public.rooms
FOR ALL USING (
  hotel_id IN (
    SELECT id FROM public.hotels 
    WHERE partner_id = (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Admins can manage all rooms" ON public.rooms
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);

-- Create RLS policies for bookings
CREATE POLICY "Guests can view their own bookings" ON public.bookings
FOR SELECT USING (
  guest_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Guests can create bookings" ON public.bookings
FOR INSERT WITH CHECK (
  guest_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Partners can view bookings for their hotels" ON public.bookings
FOR SELECT USING (
  hotel_id IN (
    SELECT id FROM public.hotels 
    WHERE partner_id = (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Admins can manage all bookings" ON public.bookings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);

-- Create RLS policies for partner registrations
CREATE POLICY "Users can view their own registration" ON public.partner_registrations
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own registration" ON public.partner_registrations
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all registrations" ON public.partner_registrations
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);

-- Create function to generate booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8));
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking reference
CREATE OR REPLACE FUNCTION set_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_reference IS NULL THEN
    NEW.booking_reference := generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_booking_reference
BEFORE INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION set_booking_reference();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotels_updated_at
BEFORE UPDATE ON public.hotels
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
BEFORE UPDATE ON public.rooms
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.hotels (name, city, category, distance_from_haram, description, is_active) VALUES
('Makkah Grand Hotel', 'makkah', 4, 500, 'Premium hotel close to Haram with excellent services', true),
('Holy Kaaba Suites', 'makkah', 5, 200, 'Luxury accommodation with Haram view', true),
('Madinah Palace Hotel', 'madina', 4, 800, 'Comfortable stay near Prophet''s Mosque', true);

-- Insert sample rooms
INSERT INTO public.rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms) VALUES
-- Makkah Grand Hotel
((SELECT id FROM public.hotels WHERE name = 'Makkah Grand Hotel'), 'double', 2, 937.00, 20),
((SELECT id FROM public.hotels WHERE name = 'Makkah Grand Hotel'), 'quad', 4, 1200.00, 15),
((SELECT id FROM public.hotels WHERE name = 'Makkah Grand Hotel'), 'multi_sharing', 8, 1800.00, 10),
-- Holy Kaaba Suites
((SELECT id FROM public.hotels WHERE name = 'Holy Kaaba Suites'), 'double', 2, 1500.00, 15),
((SELECT id FROM public.hotels WHERE name = 'Holy Kaaba Suites'), 'quad', 4, 2000.00, 10),
-- Madinah Palace Hotel
((SELECT id FROM public.hotels WHERE name = 'Madinah Palace Hotel'), 'double', 2, 750.00, 25),
((SELECT id FROM public.hotels WHERE name = 'Madinah Palace Hotel'), 'quad', 4, 950.00, 20);

-- Create admin user profile (will be created when admin signs up)
-- The actual user will be created in auth.users when they sign up