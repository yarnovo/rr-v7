import { useFetcher } from 'react-router'
import { createClient } from '~/lib/supabase.server'
import { useRef, useEffect } from 'react'
import type { Route } from './+types/notes'

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request)

  const { data: notes } = await supabase.from('notes').select()

  return {
    notes,
  }
}

export async function action({ request }: Route.ActionArgs) {
  const { supabase } = createClient(request)
  const formData = await request.formData()
  const title = formData.get('title')

  if (typeof title !== 'string' || !title) {
    return { error: 'Title is required' }
  }

  await supabase.from('notes').insert({ title })
  return { success: true }
}

type ActionResponse = { success: boolean } | { error: string }

export default function Page({ loaderData }: Route.ComponentProps) {
  const { notes } = loaderData
  const fetcher = useFetcher<ActionResponse>()
  const formRef = useRef<HTMLFormElement>(null)

  // Reset form when submission is successful
  useEffect(() => {
    if (fetcher.state === 'idle' && !('error' in (fetcher.data || {}))) {
      formRef.current?.reset()
    }
  }, [fetcher])

  return (
    <div>
      <h1>Notes</h1>

      <fetcher.Form ref={formRef} method="post" className="mb-6">
        <div className="grid gap-4">
          <textarea name="title" className="border rounded p-2" placeholder="Write your note..." />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {fetcher.state === 'submitting' ? 'Adding note...' : 'Add Note'}
          </button>
        </div>
      </fetcher.Form>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  )
}
