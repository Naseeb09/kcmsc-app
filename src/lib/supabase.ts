import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slgfncrswstvmqkxgskt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZ2ZuY3Jzd3N0dm1xa3hnc2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzAyNjcsImV4cCI6MjA4OTE0NjI2N30.dg_7QNbU9DgEKcP9z8NMKs1A7zy1J9TLfUS5OMjW8Lc';

export const supabase = createClient(supabaseUrl, supabaseKey);
