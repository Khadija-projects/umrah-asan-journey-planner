-- Add new columns to bookings table for enhanced booking flow
ALTER TABLE public.bookings 
ADD COLUMN booking_status TEXT DEFAULT 'lead' CHECK (booking_status IN ('lead', 'pending', 'confirmed', 'cancelled')),
ADD COLUMN voucher_expiry TIMESTAMP WITH TIME ZONE,
ADD COLUMN payment_receipt_url TEXT,
ADD COLUMN lead_created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN receipt_uploaded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN admin_verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN verified_by UUID;

-- Update existing bookings to have confirmed status
UPDATE public.bookings SET booking_status = 'confirmed' WHERE booking_status = 'lead';

-- Add index for better performance on booking status queries
CREATE INDEX idx_bookings_status ON public.bookings(booking_status);
CREATE INDEX idx_bookings_voucher_expiry ON public.bookings(voucher_expiry);

-- Function to generate voucher with 4-hour expiry
CREATE OR REPLACE FUNCTION public.create_booking_lead(
  p_guest_id UUID,
  p_hotel_id UUID,
  p_room_id UUID,
  p_check_in_date DATE,
  p_check_out_date DATE,
  p_num_guests INTEGER,
  p_num_rooms INTEGER,
  p_total_amount NUMERIC,
  p_special_requests TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  booking_id UUID;
BEGIN
  INSERT INTO public.bookings (
    guest_id, hotel_id, room_id, check_in_date, check_out_date,
    num_guests, num_rooms, total_amount, special_requests,
    booking_status, voucher_expiry, lead_created_at
  ) VALUES (
    p_guest_id, p_hotel_id, p_room_id, p_check_in_date, p_check_out_date,
    p_num_guests, p_num_rooms, p_total_amount, p_special_requests,
    'lead', now() + interval '4 hours', now()
  ) RETURNING id INTO booking_id;
  
  RETURN booking_id;
END;
$$;