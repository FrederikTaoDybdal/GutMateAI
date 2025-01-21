import HistoryChart from '@/components/HistoryChart'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'

const getData = async () => {
  const user = await getUserFromClerkID()
  const analyses = await prisma.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  
  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)
  const average = total / analyses.length

  return { analyses, average }
}

const HistoryPage = async () => {
  const { analyses, average } = await getData()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">History & Trends</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your symptoms and mood over time to identify patterns
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Sentiment</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {average.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Entries</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {analyses.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500">Latest Mood</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {analyses[analyses.length - 1]?.mood || 'N/A'}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sentiment Timeline</h2>
          <div className="h-[400px]">
            <HistoryChart data={analyses} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
