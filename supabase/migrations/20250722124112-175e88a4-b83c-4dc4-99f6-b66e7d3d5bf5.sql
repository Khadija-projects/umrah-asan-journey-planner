-- Create content management tables for complete CMS system

-- Ziaraat locations table
CREATE TABLE public.ziaraat_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  city TEXT NOT NULL,
  location_type TEXT NOT NULL, -- 'makkah', 'madina', 'other'
  historical_significance TEXT,
  visiting_hours TEXT,
  featured_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  meta_description TEXT,
  meta_keywords TEXT,
  distance_from_haram INTEGER, -- in meters
  recommended_duration TEXT, -- e.g., "30 minutes"
  entry_fee TEXT DEFAULT 'Free',
  special_notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Umrah guide steps table
CREATE TABLE public.umrah_guide_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  step_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  short_description TEXT,
  featured_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  video_url TEXT,
  duration_estimate TEXT, -- e.g., "15 minutes"
  important_notes TEXT,
  common_mistakes TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Services table (for taxi, train, hotels, etc.)
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  service_type TEXT NOT NULL, -- 'taxi', 'train', 'hotel', 'visa', 'flight', etc.
  description TEXT NOT NULL,
  short_description TEXT,
  featured_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  pricing_info JSONB DEFAULT '{}', -- flexible pricing structure
  features JSONB DEFAULT '[]', -- array of features
  contact_info JSONB DEFAULT '{}', -- phone, email, whatsapp
  booking_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  meta_description TEXT,
  meta_keywords TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Pages table for dynamic page management
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  page_type TEXT NOT NULL, -- 'about', 'faq', 'contact', 'custom'
  excerpt TEXT,
  featured_image_url TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  show_in_navigation BOOLEAN DEFAULT false,
  navigation_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- FAQ table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.ziaraat_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umrah_guide_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public reading and admin management
-- Ziaraat locations policies
CREATE POLICY "Anyone can view active ziaraat locations" 
  ON public.ziaraat_locations 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage all ziaraat locations" 
  ON public.ziaraat_locations 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'admin'
  ));

-- Umrah guide steps policies
CREATE POLICY "Anyone can view active umrah guide steps" 
  ON public.umrah_guide_steps 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage all umrah guide steps" 
  ON public.umrah_guide_steps 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'admin'
  ));

-- Services policies
CREATE POLICY "Anyone can view active services" 
  ON public.services 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage all services" 
  ON public.services 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'admin'
  ));

-- Pages policies
CREATE POLICY "Anyone can view published pages" 
  ON public.pages 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Admins can manage all pages" 
  ON public.pages 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'admin'
  ));

-- FAQs policies
CREATE POLICY "Anyone can view active faqs" 
  ON public.faqs 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage all faqs" 
  ON public.faqs 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'admin'
  ));

-- Create triggers for updated_at
CREATE TRIGGER update_ziaraat_locations_updated_at
  BEFORE UPDATE ON public.ziaraat_locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_umrah_guide_steps_updated_at
  BEFORE UPDATE ON public.umrah_guide_steps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data

-- Sample Ziaraat locations
INSERT INTO public.ziaraat_locations (name, slug, description, city, location_type, historical_significance, visiting_hours, distance_from_haram, recommended_duration, meta_description) VALUES
('Cave of Hira', 'cave-of-hira', 'The blessed cave where Prophet Muhammad (PBUH) received the first revelation from Allah through Angel Jibreel (AS).', 'Makkah', 'makkah', 'This is where the Quran was first revealed. The Prophet (PBUH) used to meditate here before his prophethood.', '24/7 (climbing recommended during cooler hours)', 4000, '2-3 hours', 'Visit the sacred Cave of Hira in Makkah where Prophet Muhammad received the first Quranic revelation.'),
('Quba Mosque', 'quba-mosque', 'The first mosque built in Islam. Praying two rakats here equals the reward of an Umrah.', 'Madina', 'madina', 'Built by Prophet Muhammad (PBUH) himself upon his arrival in Madina during Hijra.', 'Open 24/7', 5000, '30-45 minutes', 'Pray at Quba Mosque, the first mosque in Islam, and earn the reward of an Umrah.'),
('Mount Uhud', 'mount-uhud', 'Site of the Battle of Uhud and burial place of the martyrs including Hamza (RA).', 'Madina', 'madina', 'Scene of the famous Battle of Uhud where many companions sacrificed their lives.', 'Sunrise to sunset', 7000, '1-2 hours', 'Visit Mount Uhud in Madina, site of the historic battle and resting place of Islamic martyrs.');

-- Sample Umrah guide steps
INSERT INTO public.umrah_guide_steps (title, slug, step_number, content, short_description, duration_estimate, meta_description) VALUES
('Entering Ihram', 'entering-ihram', 1, '<h2>Entering the State of Ihram</h2><p>Before crossing the Miqat, every pilgrim must enter the state of Ihram...</p>', 'Learn how to properly enter the sacred state of Ihram before performing Umrah.', '30 minutes', 'Complete guide on entering Ihram for Umrah pilgrimage with step-by-step instructions.'),
('Tawaf al-Umrah', 'tawaf-al-umrah', 2, '<h2>Performing Tawaf</h2><p>Tawaf involves circling the Kaaba seven times in a counter-clockwise direction...</p>', 'Perform the sacred Tawaf around the Holy Kaaba with proper etiquette.', '45-60 minutes', 'Learn the proper way to perform Tawaf around the Kaaba during Umrah pilgrimage.'),
('Saee between Safa and Marwah', 'saee-safa-marwah', 3, '<h2>The Saee Ritual</h2><p>Walk or run between the hills of Safa and Marwah seven times...</p>', 'Complete the Saee ritual between Safa and Marwah hills.', '30-45 minutes', 'Complete guide to performing Saee between Safa and Marwah during Umrah.');

-- Sample services
INSERT INTO public.services (name, slug, service_type, description, short_description, features, contact_info, is_featured, meta_description) VALUES
('Makkah Taxi Service', 'makkah-taxi-service', 'taxi', 'Reliable and affordable taxi service in Makkah for pilgrims.', 'Safe and comfortable taxi rides in Makkah', '["24/7 Service", "English Speaking Drivers", "Fixed Rates", "Airport Transfers"]', '{"phone": "+966-XXX-XXXX", "whatsapp": "+966-XXX-XXXX"}', true, 'Book reliable taxi service in Makkah for safe and comfortable transportation during your pilgrimage.'),
('Madina Taxi Service', 'madina-taxi-service', 'taxi', 'Professional taxi service in Madina with experienced drivers.', 'Trusted taxi service for Madina pilgrims', '["Experienced Drivers", "Ziaraat Tours", "Hotel Transfers", "Reasonable Prices"]', '{"phone": "+966-XXX-XXXX", "whatsapp": "+966-XXX-XXXX"}', true, 'Professional taxi service in Madina for ziaraat tours and comfortable transportation.'),
('Haramain High Speed Train', 'haramain-train', 'train', 'High-speed train connecting Makkah and Madina via Jeddah.', 'Fast train service between holy cities', '["High Speed", "Comfortable Seating", "Multiple Daily Trips", "Modern Facilities"]', '{"website": "https://www.hrc.gov.sa/"}', true, 'Travel between Makkah and Madina on the modern Haramain High Speed Train.');

-- Sample pages
INSERT INTO public.pages (title, slug, content, page_type, excerpt, meta_description, show_in_navigation) VALUES
('About Umrah Asan', 'about', '<h2>About Umrah Asan</h2><p>Umrah Asan is your trusted partner for a smooth and blessed pilgrimage experience...</p>', 'about', 'Learn about our mission to provide the best Umrah services.', 'Learn about Umrah Asan and our commitment to providing excellent pilgrimage services.', true),
('Contact Us', 'contact', '<h2>Contact Umrah Asan</h2><p>Get in touch with us for any questions or booking assistance...</p>', 'contact', 'Contact our team for any assistance with your Umrah journey.', 'Contact Umrah Asan for booking assistance and pilgrimage support.', true);

-- Sample FAQs
INSERT INTO public.faqs (question, answer, category, is_featured) VALUES
('What documents do I need for Umrah?', 'You need a valid passport, Umrah visa, vaccination certificates, and travel insurance.', 'Visa & Documentation', true),
('How far in advance should I book?', 'We recommend booking at least 2-3 months in advance, especially during peak seasons.', 'Booking', true),
('What is included in hotel packages?', 'Our packages include accommodation, daily breakfast, and airport transfers. Some packages also include ziaraat tours.', 'Hotels', true),
('Is taxi service available 24/7?', 'Yes, our taxi service is available 24/7 with English-speaking drivers.', 'Transportation', false);