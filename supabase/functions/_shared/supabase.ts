import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.10";
import type { Database } from "@supabase-types";

export const supabaseClient = createClient<Database>(
  // Supabase API URL - env var exported by default when deployed.
  Deno.env.get("SUPABASE_URL") ?? "",
  // Supabase API ANON KEY - env var exported by default when deployed.
  Deno.env.get("SUPABASE_ANON_KEY") ?? "",
);

export const supabaseClientWithAuthHeader = (authHeader: string) =>
  createClient<Database>(
    // Supabase API URL - env var exported by default when deployed.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default when deployed.
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: {
          "Authorization": authHeader,
        },
      },
    },
  );

export const supabaseServiceClient = createClient<Database>(
  // Supabase API URL - env var exported by default when deployed.
  Deno.env.get("SUPABASE_URL") ?? "",
  // Supabase API SERVICE KEY - env var exported by default when deployed.
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);
