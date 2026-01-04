import { createClient } from "@supabase/supabase-js";

// detect env for Vite / Node / Next.js
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});

// Prefer NEXT_PUBLIC_* for Vercel/Next, fall back to VITE_* or other names
const SUPABASE_URL =
    env.NEXT_PUBLIC_SUPABASE_URL ||
    env.VITE_SUPABASE_URL ||
    env.SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.VITE_SUPABASE_ANON_KEY ||
    env.SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // minimal info for debugging — do not log keys in production
    console.info("Supabase initialized (using NEXT_PUBLIC/VITE env).");
} else {
    console.warn("Supabase not initialized: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    // Minimal stub so callers don't crash during dev builds
    supabase = {
        auth: {
            async resetPasswordForEmail(/* email, options */) {
                return { error: { message: "Supabase not configured", status: 500 } };
            }
        }
    };
}

export { supabase };
export default supabase;






