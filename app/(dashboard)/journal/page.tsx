import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import Question from '@/components/Question'
import { qa } from '@/util/ai'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  return (
    <div className="px-4 sm:px-8 py-6">
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Your Food Journal</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your meals and symptoms to get personalized recommendations
          </p>
          <div className="mt-4 lg:hidden">
            <NewEntry />
          </div>
        </div>
        <div className="hidden lg:block">
          <NewEntry />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <Question />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((entry) => (
          <Link 
            key={entry.id} 
            href={`/journal/${entry.id}`}
            className="transform transition-transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
          <p className="text-gray-500">Start by creating your first journal entry</p>
        </div>
      )}
    </div>
  )
}

export default JournalPage
