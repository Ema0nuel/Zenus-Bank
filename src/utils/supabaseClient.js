import { createClient } from "@supabase/supabase-js";

// detect env for Vite / Node / Next.js
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
const SUPABASE_URL = env.VITE_SUPABASE_URL || env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.warn("Supabase not initialized: missing SUPABASE_URL or SUPABASE_ANON_KEY. Set VITE_SUPABASE_* (Vite) or NEXT_PUBLIC_* (Next) env vars.");
    // Minimal stub so callers don't throw at module init — returns an error shape similar to supabase-js
    supabase = {
        auth: {
            async resetPasswordForEmail(/* email, options */) {
                return { error: { message: "Supabase not configured", status: 500 } };
            }
        }
    };
}

export { supabase };






