import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isSupabaseConfigured, supabaseConfig } from "@/lib/supabase/config";

let browserClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  browserClient ??= createClient<Database>(
    supabaseConfig.url,
    supabaseConfig.anonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  return browserClient;
}
