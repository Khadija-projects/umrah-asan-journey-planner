-- Fix security warnings by updating all functions to include SECURITY DEFINER SET search_path = ''

-- Update the generate_booking_reference function
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  RETURN 'UMR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8));
END;
$$;

-- Update the set_booking_reference function  
CREATE OR REPLACE FUNCTION public.set_booking_reference()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF NEW.booking_reference IS NULL THEN
    NEW.booking_reference := generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$;

-- Update the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;