import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isSupabaseConfigured, supabaseConfig } from "@/lib/supabase/config";

export const getSupabaseServerClient = cache(() => {
  if (!isSupabaseConfigured) {
    return null;
  }

  return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
});
