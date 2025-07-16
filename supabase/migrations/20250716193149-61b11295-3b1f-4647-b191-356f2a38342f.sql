-- Enable RLS on all demo tables
ALTER TABLE public.demo_user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_partner_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for demo_user_data
CREATE POLICY "Anyone can read demo user data" 
ON public.demo_user_data 
FOR SELECT 
USING (true);

-- Create policies for demo_bookings
CREATE POLICY "Anyone can read demo bookings" 
ON public.demo_bookings 
FOR SELECT 
USING (true);

-- Create policies for demo_partner_registrations
CREATE POLICY "Anyone can read demo partner registrations" 
ON public.demo_partner_registrations 
FOR SELECT 
USING (true);

-- Fix search path for existing functions
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';

CREATE OR REPLACE FUNCTION public.set_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_reference IS NULL THEN
    NEW.booking_reference := generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';

CREATE OR REPLACE FUNCTION public.link_demo_data_to_user()
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
      FROM demo_user_data WHERE email = NEW.email
      ON CONFLICT (user_id) DO NOTHING;
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
      WHERE db.guest_email = NEW.email
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';