import { createClient, SupabaseClient } from "@supabase/supabase-js";


const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

let supabase: SupabaseClient;

try {
  supabase = createClient(supabaseUrl, serviceRoleKey);
} catch (error) {
  console.error("Error creating Supabase client:", error);
  throw new Error("Failed to initialize Supabase client");
}

export { supabase };