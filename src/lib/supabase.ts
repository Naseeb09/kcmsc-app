import { createClient } from '@supabase/supabase-js';

const FALLBACK_URL = 'https://pjrbhqviexpqmtdgwurv.supabase.co';
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcmJocXZpZXhwcW10ZGd3dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODg5MDAsImV4cCI6MjEwNjg2NDkwMH0.wwFpHSA6-Xylgr_piob3n3SUgFAaXqTcJ9fiQaZRWaw';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
