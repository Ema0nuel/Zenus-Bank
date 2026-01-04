import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://biyuydrbirwsbtnymakk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpeXV5ZHJiaXJ3c2J0bnltYWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MzI5NTksImV4cCI6MjA4MzEwODk1OX0.HP7JCPOAQRnOZqfVWMrrsCZfHkq6bXd3aCLFKgaZ5lg";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const RESEND_API_KEY = "re_9MsArQ61_Fh8rpf1uisXB5iRmDMrbq9r6";
// Kill mode