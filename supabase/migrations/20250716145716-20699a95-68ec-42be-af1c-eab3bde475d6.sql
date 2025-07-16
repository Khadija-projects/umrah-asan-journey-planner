-- Enable email authentication and configure auth settings
UPDATE auth.config SET 
  enable_signup = true,
  email_confirm = false,
  enable_email_signup = true
WHERE true;