import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string
          password: string
          role: 'mentor' | 'mentee'
          career: string
          created_at: string
        }
        Insert: {
          id?: string
          name?: string
          email: string
          password: string
          role: 'mentor' | 'mentee'
          career?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          password?: string
          role?: 'mentor' | 'mentee'
          career?: string
          created_at?: string
        }
      }
    }
  }
}