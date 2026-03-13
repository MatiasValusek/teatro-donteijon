import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isSupabaseConfigured, supabaseConfig } from "@/lib/supabase/config";

type CreateSupabaseClientOptions = {
  accessToken?: string;
};

export function createSupabaseClient(options?: CreateSupabaseClientOptions) {
  if (!isSupabaseConfigured) {
    return null;
  }

  return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: options?.accessToken
      ? {
          headers: {
            Authorization: `Bearer ${options.accessToken}`,
          },
        }
      : undefined,
  });
}
