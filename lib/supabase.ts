import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This client is safe to use in the browser (uses Anon Key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// NOTE: For server-side operations (like Prisma), we usually don't use this client directly
// Instead, we use Prisma Client. reliable on the 'DATABASE_URL' environment variable.
