export const supabasePublicEnvKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export type SupabasePublicEnvKey = (typeof supabasePublicEnvKeys)[number];

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

export function getMissingSupabasePublicEnvKeys(): SupabasePublicEnvKey[] {
  return supabasePublicEnvKeys.filter((key) => {
    switch (key) {
      case "NEXT_PUBLIC_SUPABASE_URL":
        return supabaseConfig.url.length === 0;
      case "NEXT_PUBLIC_SUPABASE_ANON_KEY":
        return supabaseConfig.anonKey.length === 0;
      default:
        return true;
    }
  });
}

export const isSupabaseConfigured =
  getMissingSupabasePublicEnvKeys().length === 0;
