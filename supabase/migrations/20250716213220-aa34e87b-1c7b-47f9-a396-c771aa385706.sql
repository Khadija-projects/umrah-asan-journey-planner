-- Phase 1: Link hotels to partner
DO $$
DECLARE
    partner_profile_id UUID;
BEGIN
    -- Get the partner profile ID
    SELECT id INTO partner_profile_id 
    FROM profiles 
    WHERE user_type = 'partner' 
    LIMIT 1;
    
    -- Update all hotels to assign them to the partner
    IF partner_profile_id IS NOT NULL THEN
        UPDATE hotels 
        SET partner_id = partner_profile_id 
        WHERE partner_id IS NULL;
        
        RAISE NOTICE 'Updated hotels to assign to partner: %', partner_profile_id;
    END IF;
END $$;

-- Phase 2: Create rooms for existing hotels
INSERT INTO rooms (hotel_id, room_type, max_guests, price_per_night, available_rooms)
SELECT 
    h.id as hotel_id,
    CASE 
        WHEN h.category = 5 THEN 'Executive Suite'
        WHEN h.category = 4 THEN 'Deluxe Room'
        WHEN h.category = 3 THEN 'Standard Room'
        ELSE 'Economy Room'
    END as room_type,
    CASE 
        WHEN h.category >= 4 THEN 4
        ELSE 2
    END as max_guests,
    CASE 
        WHEN h.category = 5 THEN 500.00
        WHEN h.category = 4 THEN 350.00
        WHEN h.category = 3 THEN 250.00
        ELSE 150.00
    END as price_per_night,
    10 as available_rooms
FROM hotels h
WHERE NOT EXISTS (
    SELECT 1 FROM rooms r WHERE r.hotel_id = h.id
);

-- Phase 3: Transfer demo bookings to main bookings table
DO $$
DECLARE
    guest_profile_id UUID;
    booking_record RECORD;
    hotel_id_var UUID;
    room_id_var UUID;
BEGIN
    -- Get the guest profile ID
    SELECT id INTO guest_profile_id 
    FROM profiles 
    WHERE user_type = 'guest' 
    LIMIT 1;
    
    IF guest_profile_id IS NOT NULL THEN
        -- Loop through demo bookings and transfer them
        FOR booking_record IN 
            SELECT * FROM demo_bookings
        LOOP
            -- Find matching hotel by name
            SELECT id INTO hotel_id_var 
            FROM hotels 
            WHERE LOWER(name) LIKE LOWER('%' || booking_record.hotel_name || '%')
            LIMIT 1;
            
            -- If no exact match, get first hotel
            IF hotel_id_var IS NULL THEN
                SELECT id INTO hotel_id_var FROM hotels LIMIT 1;
            END IF;
            
            -- Get a room for this hotel
            SELECT id INTO room_id_var 
            FROM rooms 
            WHERE hotel_id = hotel_id_var 
            LIMIT 1;
            
            -- Insert into main bookings table with correct payment status mapping
            IF hotel_id_var IS NOT NULL AND room_id_var IS NOT NULL THEN
                INSERT INTO bookings (
                    guest_id,
                    hotel_id,
                    room_id,
                    booking_reference,
                    check_in_date,
                    check_out_date,
                    num_guests,
                    num_rooms,
                    total_amount,
                    special_requests,
                    payment_status,
                    booking_status,
                    created_at
                ) VALUES (
                    guest_profile_id,
                    hotel_id_var,
                    room_id_var,
                    booking_record.booking_reference,
                    booking_record.check_in_date,
                    booking_record.check_out_date,
                    booking_record.num_guests,
                    COALESCE(booking_record.num_rooms, 1),
                    booking_record.total_amount,
                    booking_record.special_requests,
                    CASE 
                        WHEN booking_record.payment_status = 'confirmed' THEN 'paid'
                        ELSE 'pending'
                    END,
                    'confirmed',
                    booking_record.created_at
                );
                
                RAISE NOTICE 'Transferred booking: %', booking_record.booking_reference;
            END IF;
        END LOOP;
        
        RAISE NOTICE 'Demo bookings transfer completed for guest: %', guest_profile_id;
    END IF;
END $$;