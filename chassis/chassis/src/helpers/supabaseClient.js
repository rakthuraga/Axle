import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.REACT_APP_SUPABASE_PROJECT_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

export async function fetchCarPartFromQuery(query) {
    return await supabase.from('car_parts').select().ilike('name', `%${query}%`);
}