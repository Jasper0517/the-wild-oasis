import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://onyxpfcdywesztnpumtl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueXhwZmNkeXdlc3p0bnB1bXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5MzQ5NzEsImV4cCI6MjAzOTUxMDk3MX0.3NB-qo1FuJYToZA9JG2LRHRucOMQboFkl8KoZmJXRfg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
