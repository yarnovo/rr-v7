import { redirect } from 'react-router'
import { Form, useActionData, useLoaderData } from 'react-router'
import type { ActionFunctionArgs } from 'react-router'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { createClient } from '~/lib/supabase.server'
import type { Route } from '../+types/root'

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { supabase } = createClient(request)
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (!token) {
    // If no token is provided, redirect to sign-in
    return redirect('/sign-in')
  }

  return { token }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createClient(request)
  const formData = await request.formData()
  const token = formData.get('token') as string
  const password = formData.get('password') as string

  // Use the token to update the password
  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  // Redirect to sign-in page after successful password update
  return redirect('/sign-in', { headers })
}

const ForgotPassword = () => {
  const actionData = useActionData<typeof action>()
  const { token } = useLoaderData<typeof loader>()

  return (
    <div className="max-w-md mx-auto mt-24">
      <p>Update your password</p>
      <Form method="post" className="grid gap-4 mt-4">
        <input type="hidden" name="token" value={token} />
        <Input type="password" name="password" placeholder="Password" required />
        <br />
        <Button type="submit">Update password</Button>
      </Form>
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
    </div>
  )
}

export default ForgotPassword
