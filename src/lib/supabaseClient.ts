import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types' // <-- Tipe akan kita buat di langkah berikutnya

// Ambil variabel lingkungan seperti sebelumnya
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Buat client dengan tipe database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)