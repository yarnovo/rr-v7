import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client can only be created in the browser')
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.ENV

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

declare global {
  interface Window {
    ENV: {
      SUPABASE_URL: string
      SUPABASE_ANON_KEY: string
    }
  }
}
