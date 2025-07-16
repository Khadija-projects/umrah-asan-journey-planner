-- Create a function to automatically link demo data when demo users sign up
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically link demo data when profiles are created
DROP TRIGGER IF EXISTS link_demo_data_trigger ON profiles;
CREATE TRIGGER link_demo_data_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION link_demo_data_to_user();