import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = Boolean(url && anonKey);
if (!hasSupabaseConfig) {
  console.info("Supabase is not configured. Using the local Level 2 demo dataset.");
}

export const supabase = hasSupabaseConfig
  ? createClient(url!, anonKey!, { auth: { persistSession: false } })
  : null;
