import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import type { JournalEntry } from '@/types/journal'
import { notFound } from 'next/navigation'

const getEntry = async (id: string): Promise<JournalEntry | null> => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const JournalEditorPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)

  if (!entry) {
    notFound()
  }

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default JournalEditorPage
