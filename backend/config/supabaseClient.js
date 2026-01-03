// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key not found in .env");
  }

  return createClient(supabaseUrl, supabaseKey);
};

export default supabase;
