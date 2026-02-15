const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fhlpjasgfeyxzfxgcsas.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobHBqYXNnZmV5eHpmeGdjc2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTY2MjcsImV4cCI6MjA4NTk3MjYyN30.bGH10auSMMTwxx3I7_X6Q8xzY0LHxW832SeFZrTAy0U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
    const { data: profiles, error } = await supabase.from('profiles').select('id, full_name, role, province');
    if (error) console.error(error);
    else console.log("Profiles:", JSON.stringify(profiles, null, 2));
}

diagnose();
