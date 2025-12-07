import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ifodbqygscdsxxlxfjxw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2RicXlnc2Nkc3h4bHhmanh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NzMxMjgsImV4cCI6MjA3NDA0OTEyOH0.4iWXqBYp8AhpcLze5H3cMxIqpdwzAB40az3BllFdG0g";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const RESEND_API_KEY = "re_9MsArQ61_Fh8rpf1uisXB5iRmDMrbq9r6";





