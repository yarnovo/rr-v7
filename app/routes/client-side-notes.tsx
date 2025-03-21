import { useState } from 'react'
import { createClient } from '~/lib/supabase.client'

export default function Page() {
  const supabase = createClient()
  const [notes, setNotes] = useState<any[]>([])
  // Reset form when submission is successful

  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="w-full max-w-5xl mx-auto mt-12">
        <h1>Notes</h1>
        <button
          onClick={async () => {
            const { data, error } = await supabase.from('notes').select()
            console.log(data)
            setNotes(data || [])
          }}
        >
          {' '}
          load notes
        </button>
        {notes && <pre>{JSON.stringify(notes, null, 2)}</pre>}
      </div>
    </div>
  )
}
