// Initialize Supabase Client
// Replace these with your actual Supabase project URL and anon public key
const SUPABASE_URL = 'https://deryixfnqqccfvaohcom.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcnlpeGZucXFjY2Z2YW9oY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTI2MDksImV4cCI6MjA5ODI4ODYwOX0.FbPgz2EqQ1LiVRPMhdFrfw9Y1MdwRpcpxTjzpyuyCmY';

// Initialize the client (using the global supabase object from the CDN script)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
