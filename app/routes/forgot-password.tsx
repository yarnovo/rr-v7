import { redirect } from 'react-router'
import { Form, useActionData } from 'react-router'
import type { ActionFunctionArgs } from 'react-router'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { createClient } from '~/lib/supabase.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createClient(request)
  const formData = await request.formData()
  const email = formData.get('email') as string
  const origin = new URL(request.url).origin

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=${origin}/update-password`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    message: 'Please check your email for a password reset link to log into the website.',
    data: { email: '' },
    headers,
  }
}

const ForgotPassword = () => {
  const actionData = useActionData<typeof action>()

  return (
    <div className="max-w-md mx-auto mt-24">
      <p>Forgot your password? </p>

      {actionData?.message ? <div className="p-4 bg-gray-100 rounded-md my-3 mb-10">{actionData?.message}</div> : null}
      <Form method="post" className="grid gap-4 mt-4">
        <Input type="email" name="email" placeholder="Email" required />
        <br />
        <Button type="submit">Send reset email</Button>
      </Form>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
    </div>
  )
}

export default ForgotPassword
