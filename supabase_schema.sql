-- ==============================================================================
-- KC MODEL SCHOOL & COLLEGE - CAMPUS NAVIGATOR
-- Supabase Schema for Lost & Found System
-- Project: https://pjrbhqviexpqmtdgwurv.supabase.co
-- ==============================================================================

-- 1. Create Lost and Found Posts Table
CREATE TABLE IF NOT EXISTS public.lost_and_found (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    student_name TEXT DEFAULT '',
    contact_info TEXT DEFAULT '',
    media_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Create Lost and Found Discussion / Comments Table
CREATE TABLE IF NOT EXISTS public.lost_and_found_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.lost_and_found(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.lost_and_found_comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_contact TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Create Helpful Indexes
CREATE INDEX IF NOT EXISTS idx_lost_and_found_created_at ON public.lost_and_found (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lost_and_found_type ON public.lost_and_found (type);
CREATE INDEX IF NOT EXISTS idx_lost_and_found_comments_post_id ON public.lost_and_found_comments (post_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.lost_and_found ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lost_and_found_comments ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Posts
DROP POLICY IF EXISTS "Allow public read access to lost_and_found" ON public.lost_and_found;
CREATE POLICY "Allow public read access to lost_and_found"
    ON public.lost_and_found FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Allow public insert to lost_and_found" ON public.lost_and_found;
CREATE POLICY "Allow public insert to lost_and_found"
    ON public.lost_and_found FOR INSERT
    TO public
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to lost_and_found" ON public.lost_and_found;
CREATE POLICY "Allow public update to lost_and_found"
    ON public.lost_and_found FOR UPDATE
    TO public
    USING (true);

DROP POLICY IF EXISTS "Allow public delete to lost_and_found" ON public.lost_and_found;
CREATE POLICY "Allow public delete to lost_and_found"
    ON public.lost_and_found FOR DELETE
    TO public
    USING (true);

-- 6. RLS Policies for Comments
DROP POLICY IF EXISTS "Allow public read access to lost_and_found_comments" ON public.lost_and_found_comments;
CREATE POLICY "Allow public read access to lost_and_found_comments"
    ON public.lost_and_found_comments FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Allow public insert to lost_and_found_comments" ON public.lost_and_found_comments;
CREATE POLICY "Allow public insert to lost_and_found_comments"
    ON public.lost_and_found_comments FOR INSERT
    TO public
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete to lost_and_found_comments" ON public.lost_and_found_comments;
CREATE POLICY "Allow public delete to lost_and_found_comments"
    ON public.lost_and_found_comments FOR DELETE
    TO public
    USING (true);

-- 7. Enable Supabase Realtime for Live Updates
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.lost_and_found;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.lost_and_found_comments;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END $$;

-- 8. Create Storage Bucket for Uploaded Photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('lost-and-found', 'lost-and-found', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 9. Storage Policies
DROP POLICY IF EXISTS "Allow public read on lost-and-found bucket" ON storage.objects;
CREATE POLICY "Allow public read on lost-and-found bucket"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'lost-and-found');

DROP POLICY IF EXISTS "Allow public insert on lost-and-found bucket" ON storage.objects;
CREATE POLICY "Allow public insert on lost-and-found bucket"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'lost-and-found');

DROP POLICY IF EXISTS "Allow public delete on lost-and-found bucket" ON storage.objects;
CREATE POLICY "Allow public delete on lost-and-found bucket"
    ON storage.objects FOR DELETE
    TO public
    USING (bucket_id = 'lost-and-found');
