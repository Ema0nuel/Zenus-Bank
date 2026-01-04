/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js'

const getSupabaseUrl = () => {
    // Try Vercel environment variables first
    if (typeof window === 'undefined') {
        return "https://ifodbqygscdsxxlxfjxw.supabase.co";
    }
    // Fallback to Vite environment variables for local development
    return import.meta.env.VITE_SUPABASE_URL;
};

const getSupabaseAnonKey = () => {
    if (typeof window === 'undefined') {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2RicXlnc2Nkc3h4bHhmanh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NzMxMjgsImV4cCI6MjA3NDA0OTEyOH0.4iWXqBYp8AhpcLze5H3cMxIqpdwzAB40az3BllFdG0g";
    }
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
};

export const supabase = createClient(
    getSupabaseUrl(),
    getSupabaseAnonKey()
);
