import { createClient } from '@supabase/supabase-js';

const meta = import.meta as any;
const SUPABASE_URL = meta.env?.VITE_SUPABASE_URL || 'https://yquitqezjsykonweodpn.supabase.co';
const SUPABASE_ANON_KEY = meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxdWl0cWV6anN5a29ud2VvZHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTAxMjMsImV4cCI6MjEwMTA4NjEyM30.6A9pca-365V964FjD7YvhCer6o1MZNAUcsZq4TtfTxI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
