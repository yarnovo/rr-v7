import { type RouteConfig, route, index } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('notes', 'routes/notes.tsx'),
  route('sign-in', 'routes/sign-in.tsx'),
  route('sign-up', 'routes/sign-up.tsx'),
  route('forgot-password', 'routes/forgot-password.tsx'),
  route('protected', 'routes/protected.tsx'),
] satisfies RouteConfig
