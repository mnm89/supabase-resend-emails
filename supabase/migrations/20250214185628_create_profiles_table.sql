
-- Table and Constraints definition --

-- Create the profiles table
CREATE TABLE profiles (
    -- Primary key and reference to user id on the auth schema
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Personal Information
    full_name TEXT CHECK (char_length(full_name) BETWEEN 3 AND 100), -- Min 3, Max 100 characters
    avatar_url TEXT CHECK (avatar_url ~ '^https?:\/\/'), -- Must be a valid URL,
    bio TEXT CHECK (char_length(bio) <= 500), -- Max 500 characters
    date_of_birth DATE CHECK (date_of_birth < NOW()), -- Must be in the past
    gender TEXT CHECK (gender IN ('male', 'female', 'non-binary', 'other','prefer_not_to_say')),
    address JSONB DEFAULT NULL, -- Structured JSONB for address

    -- Preferences
    language TEXT DEFAULT 'en',
    theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
    currency TEXT DEFAULT 'USD',
    timezone TEXT DEFAULT 'UTC',
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    push_notifications BOOLEAN DEFAULT TRUE,

    -- Social Links
    social_links JSONB, -- Example: { "twitter": "@user", "github": "github.com/user" }

    -- Account Metadata
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add a constraint to enforce JSONB structure for address
ALTER TABLE profiles
ADD CONSTRAINT check_address_structure
CHECK (
  jsonb_typeof(address) = 'object' AND
  address ? 'street' AND
  address ? 'city' AND
  address ? 'state' AND
  address ? 'country' AND
  address ? 'zip'
);

-- Triggers And Validations --

-- Create a function trigger to be executed when insert or update triggered
CREATE OR REPLACE FUNCTION validate_social_links()
RETURNS TRIGGER AS $$
DECLARE
  key TEXT;
  value TEXT;
BEGIN
  -- Skip validation if social_links is NULL
  IF NEW.social_links IS NULL THEN
    RETURN NEW;
  END IF;

  FOR key, value IN
    SELECT * FROM jsonb_each_text(NEW.social_links)
  LOOP
     -- Validate that all keys are from the allowed list
    IF key NOT IN ('twitter', 'github', 'linkedin', 'facebook', 'instagram', 'website') THEN
        RAISE EXCEPTION 'Invalid key in social_links: %', key;
    END IF;

    -- Check if value is a valid URL (basic regex)
    IF value !~* '^https?:\/\/[^\s/$.?#].[^\s]*$' THEN
      RAISE EXCEPTION 'Invalid URL format in social_links: "%" (must be a valid URL)', value;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the profiles table
CREATE OR REPLACE TRIGGER check_social_links
BEFORE INSERT OR UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION validate_social_links();

-- Create a function trigger to be executed when a user confirms their email been triggered
CREATE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER 
SECURITY definer
AS $$
BEGIN
  -- Only create a profile when a user confirms their email
  IF NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.profiles (id) VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires when a user confirms their email
CREATE TRIGGER create_profile_after_email_confirmation
AFTER UPDATE ON auth.users
FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION create_profile_for_new_user();

-- Create a function to update the `updated_at` column
CREATE OR REPLACE FUNCTION populate_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the `profiles` table
CREATE TRIGGER trigger_populate_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION populate_updated_at_column();

-- RLS --

-- Enable Row-Level Security on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;


-- Enable users to delete their profiles
CREATE POLICY "Enable users to delete their profiles"
ON "public"."profiles"
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (
  auth.uid() = id
);

-- Enable users to view their own profile only
CREATE POLICY "Enable users to view their own profile only"
ON "public"."profiles"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
);

-- Enable users to update their profile
CREATE POLICY "Enable users to update their profile"
ON "public"."profiles"
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id
)
WITH CHECK (
  auth.uid() = id
);
