
-- Create blogs table for dynamic blog management
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Umrah Asan Team',
  category TEXT NOT NULL,
  featured_image_url TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  read_time TEXT DEFAULT '5 min read',
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published blogs
CREATE POLICY "Anyone can view published blogs" 
  ON public.blogs 
  FOR SELECT 
  USING (published = true);

-- Allow admins to manage all blogs
CREATE POLICY "Admins can manage all blogs" 
  ON public.blogs 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND user_type = 'admin'
  ));

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert existing blog data
INSERT INTO public.blogs (title, slug, excerpt, content, category, meta_description) VALUES
(
  'Discover the Spiritual Heartbeat of Islam: Holy Makkah',
  'exploring-blessings-holy-makkah',
  'Holy Makkah — the birthplace of Prophet Muhammad (PBUH) — holds a special place in every Muslim''s heart. Millions of pilgrims travel here each year to perform Umrah and Hajj...',
  '<h2>Introduction</h2>
  <p>Holy Makkah — the birthplace of Prophet Muhammad (PBUH) — holds a special place in every Muslim''s heart. Millions of pilgrims travel here each year to perform Umrah and Hajj, seeking forgiveness, blessings, and closeness to Allah Almighty. But beyond the Kaaba, what else makes Makkah so deeply spiritual and unique?</p>

  <h2>The Blessing Masjid al-Haram</h2>
  <p>At the heart of Makkah lies Masjid al-Haram, the largest mosque in the world and the home of the Holy Kaaba. Pilgrims from every corner of the globe gather here day and night, creating an atmosphere of unity, peace, and prayer.</p>

  <h2>Historic Landmarks</h2>
  <p>Makkah is filled with sites rich in Islamic history:</p>
  <ul>
    <li><strong>Mount Safa and Marwah:</strong> Where Hajar (RA) ran in search of water for her son, Prophet Ismail (AS).</li>
    <li><strong>Jabal al-Noor:</strong> Home to the Cave of Hira, where the first revelation descended.</li>
    <li><strong>Mina & Arafat:</strong> Sites central to Hajj rituals.</li>
  </ul>

  <h2>Modern Comforts for Pilgrims</h2>
  <p>Today, Makkah is well-equipped with world-class hotels, shopping centers, and transport options to make your pilgrimage as comfortable as possible. Pilgrims can book premium stays near the Haram, access taxis easily, and even explore local restaurants serving authentic Hijazi cuisine.</p>

  <h2>Tips for a Peaceful Visit</h2>
  <ul>
    <li>Book your hotel in advance, especially during Ramadan or Hajj.</li>
    <li>Use trusted taxi services for safe and easy travel.</li>
    <li>Carry a small prayer mat and water bottle at all times.</li>
    <li>Respect local customs and dress modestly.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Visiting Holy Makkah is not just a journey — it''s a life-changing experience. May your time here bring peace, forgiveness, and spiritual renewal.</p>
  
  <p><strong>👉 Ready to plan your Holy Makkah Umrah? Book now with Umrah Asan for trusted hotels, taxis, and ziaraat assistance.</strong></p>',
  'Spiritual Journey',
  'Discover the spiritual significance of Holy Makkah, the birthplace of Prophet Muhammad. Learn about historic landmarks, modern facilities, and tips for pilgrims.'
),
(
  'Holy Madina: The City of Peace and Prophet''s Love',
  'finding-serenity-holy-madina',
  'Holy Madina — Al-Madinah Al-Munawwarah — is the second holiest city in Islam and the final resting place of Prophet Muhammad (PBUH). For every Muslim, a visit to Madina brings...',
  '<h2>Introduction</h2>
  <p>Holy Madina — Al-Madinah Al-Munawwarah — is the second holiest city in Islam and the final resting place of Prophet Muhammad (PBUH). For every Muslim, a visit to Madina brings a sense of calmness, love, and connection to the Prophet''s (PBUH) legacy.</p>

  <h2>Masjid an-Nabawi</h2>
  <p>Masjid an-Nabawi (The Prophet''s Mosque) is the highlight of every visit to Madina. Praying here once is better than a thousand prayers elsewhere — except Masjid al-Haram. Pilgrims offer Salat, send blessings upon the Prophet (PBUH), and visit Rawdah — a garden from the gardens of Paradise.</p>

  <h2>Key Ziaraat in Madina</h2>
  <p>Madina is full of blessed historical sites:</p>
  <ul>
    <li><strong>Jannat al-Baqi:</strong> The resting place of many family members and companions of the Prophet (PBUH).</li>
    <li><strong>Quba Mosque:</strong> The first mosque built in Islam. Praying two rakats here equals the reward of an Umrah.</li>
    <li><strong>Uhud Mountain:</strong> Site of the famous Battle of Uhud. Visit the graves of the martyrs and reflect on their sacrifice.</li>
  </ul>

  <h2>Tranquil Atmosphere</h2>
  <p>Unlike the bustling energy of Makkah, Madina''s vibe is peaceful and calm. Streets are quiet, people walk slowly, and the whole city radiates serenity.</p>

  <h2>Tips for a Smooth Visit</h2>
  <ul>
    <li>Dress respectfully and maintain the sanctity of this blessed city.</li>
    <li>Use taxis or local buses to reach ziaraat spots easily.</li>
    <li>Book hotels near the Prophet''s Mosque for convenience and frequent prayers.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Holy Madina is not just a city — it is an embrace of peace and mercy. May every visitor return with hearts full of light, love, and blessings.</p>
  
  <p><strong>👉 Want to experience the serenity of Madina? Umrah Asan helps you find trusted hotels and smooth taxi rides for your peaceful stay.</strong></p>',
  'Blessing Places',
  'Explore Holy Madina, the city of peace and Prophet Muhammad''s resting place. Discover Masjid an-Nabawi, key ziaraat sites, and tips for a peaceful visit.'
);
