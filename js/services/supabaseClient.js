import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://odhvvyovhqdghxdnljkt.supabase.co";
const supabaseKey = "sb_publishable_4iY1n-fsStaHmqH76m5ecA_9DWglVOT";

// Create client
//export const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
export const supabaseClient = createClient(supabaseUrl, supabaseKey);