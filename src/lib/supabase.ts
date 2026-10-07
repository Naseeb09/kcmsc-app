import { createClient } from '@supabase/supabase-js';

const CURRENT_URL = 'https://pjrbhqviexpqmtdgwurv.supabase.co';
const CURRENT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcmJocXZpZXhwcW10ZGd3dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODg5MDAsImV4cCI6MjEwNjg2NDkwMH0.wwFpHSA6-Xylgr_piob3n3SUgFAaXqTcJ9fiQaZRWaw';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || CURRENT_URL;
let supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || CURRENT_ANON_KEY;

// If Vercel project settings still inject the old dead database URL/key, override with the new project
if (!supabaseUrl || supabaseUrl.includes('slgfncrswstvmqkxgskt') || !supabaseUrl.includes('pjrbhqviexpqmtdgwurv')) {
  supabaseUrl = CURRENT_URL;
}
if (!supabaseKey || supabaseKey.includes('slgfncrswstvmqkxgskt') || !supabaseKey.includes('pjrbhqviexpqmtdgwurv')) {
  supabaseKey = CURRENT_ANON_KEY;
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // Prevents Firefox / mobile simulator LockManager deadlock errors
    lock: (_name, _acquireTimeout, fn) => fn(),
  }
});
