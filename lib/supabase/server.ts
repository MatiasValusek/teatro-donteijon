import { cache } from "react";
import { createSupabaseClient } from "@/lib/supabase/base";

export { createSupabaseClient as createSupabaseServerClient } from "@/lib/supabase/base";

export const getSupabaseServerClient = cache(() => createSupabaseClient());
