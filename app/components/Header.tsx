import { Link, useRouteLoaderData } from 'react-router'

import { EnvVarWarning } from './EnvVarWarning'
import HeaderNav from './HeaderNav'

export default function Header() {
  const { hasEnvVars } = useRouteLoaderData('root')

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link to={'/'}>React Router Supabase Starter</Link>
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderNav />}
      </div>
    </nav>
  )
}
