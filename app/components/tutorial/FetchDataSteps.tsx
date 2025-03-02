import { TutorialStep } from './TutorialStep'
import { CodeBlock } from './CodeBlock'
import { Link } from 'react-router'

const create = `create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from React Router.'),
  ('It was awesome!');
`.trim()

const server = `
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
    <div className="flex-1 w-full flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="w-full max-w-5xl mx-auto mt-12">
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
    </div>
  )
}
`.trim()

export default function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create some tables and insert some data">
        <p>
          Head over to the{' '}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{' '}
          for your Supabase project to create a table and insert some example data. If you're stuck for creativity, you can copy and paste
          the following into the{' '}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>{' '}
          and click RUN!
        </p>
        <CodeBlock code={create} />
      </TutorialStep>

      <TutorialStep title="Fetch and update Supabase data from React Router">
        <p>
          To create a Supabase client and query data, create a new route file at
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            /routes/notes.tsx
          </span>{' '}
          and add the following:
        </p>
        <CodeBlock code={server} />
      </TutorialStep>

      <TutorialStep title="View your new notes page">
        <p>
          View your notes by navigating to{' '}
          <Link to="/notes" className="underline">
            notes
          </Link>
        </p>
      </TutorialStep>
      <TutorialStep title="Build in a weekend and scale to millions!">
        <p>You're ready to launch your product to the world! 🚀</p>
      </TutorialStep>
    </ol>
  )
}
