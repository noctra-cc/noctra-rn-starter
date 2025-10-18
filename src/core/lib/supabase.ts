import { ENV } from "@/src/core/config/environment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

if (!ENV?.SUPABASE_KEY || !ENV.SUPABASE_URL) {
  throw new Error("Environment variables not loaded. Cannot initialize Supabase client.");
}

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
