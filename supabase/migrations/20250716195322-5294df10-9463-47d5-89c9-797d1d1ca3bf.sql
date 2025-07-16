-- Fix Supabase authentication configuration to relax email validation
UPDATE auth.config SET 
  enable_signup = true,
  email_confirm = false,
  enable_email_signup = true,
  email_double_confirm_changes = false,
  enable_email_change_confirmation = false
WHERE true;

-- Disable strict email validation and enable more permissive settings
UPDATE auth.config SET
  site_url = 'http://localhost:3000',
  additional_redirect_urls = 'http://localhost:3000,https://*.lovableproject.com'
WHERE true;