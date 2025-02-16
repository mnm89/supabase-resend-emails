
INSERT INTO storage.buckets ("id", "name", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types") 
VALUES ('avatars', 'avatars', true, false, 1048576, ARRAY['image/jpeg','image/png']);

-- Enable RLS on the avatars bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow users to upload their own images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK ( auth.uid() = substring(name from '^(.*?)(?=\.jpe?g|\.png)')::uuid );

CREATE POLICY "Allow users to update their own images" 
ON storage.objects  
FOR UPDATE 
TO authenticated 
USING ( auth.uid() = substring(name from '^(.*?)(?=\.jpe?g|\.png)')::uuid );

CREATE POLICY "Allow users to delete their own images" 
ON storage.objects
FOR DELETE 
TO authenticated 
USING ( auth.uid() = substring(name from '^(.*?)(?=\.jpe?g|\.png)')::uuid );

CREATE POLICY "Allow any authenticated user to download images" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING ( true );