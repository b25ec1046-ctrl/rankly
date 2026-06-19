import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dreczplnzvvmmauxoqch.supabase.co";

const supabaseAnonKey = "sb_publishable_kQhoQyrww5rE_gW5tMvGYw_XrDTktdP";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
