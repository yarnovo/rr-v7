import type { ActionFunctionArgs } from 'react-router'
import { redirect } from 'react-router'
import { createClient } from '~/lib/supabase.server'

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const { supabase, headers } = createClient(request)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return redirect('/sign-in')
    }
    return redirect('/dashboard', {
      headers,
    })
  }
  return new Response('Authentication faild', {
    status: 400,
  })
}
