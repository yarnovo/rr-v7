import Hero from '~/components/Hero'
import SignUpUserSteps from '~/components/tutorial/SignUpUserSteps'
import ConnectSupabaseSteps from '~/components/tutorial/ConnectSupabaseSteps'
import type { Route } from '../+types/root'

export async function loader() {
  const hasEnvVars = !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  return { hasEnvVars }
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { hasEnvVars } = loaderData
  return (
    <div className="p-5">
      <Hero />

      <h2 className="font-medium text-xl mb-4">Next steps</h2>
      {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
    </div>
  )
}
