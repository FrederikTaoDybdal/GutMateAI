import type { JournalEntry } from '@/types/journal'

interface EntryCardProps {
  entry: JournalEntry
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  const mood = entry.analysis?.mood || 'Analyzing...'
  const summary = entry.analysis?.summary || 'Processing your entry...'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header with date and mood */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <time className="text-sm font-medium text-gray-600">{date}</time>
          <div className="flex items-center">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-brand-light text-brand-primary">
              {mood}
            </span>
          </div>
        </div>
      </div>

      {/* Summary content */}
      <div className="px-5 py-4">
        <p className="text-sm text-gray-600 line-clamp-3">
          {summary}
        </p>
      </div>

      {/* Footer with metadata */}
      <div className="px-5 py-3 bg-gray-50 rounded-b-xl border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <svg 
            className="mr-1.5 h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Click to view details
        </div>
      </div>
    </div>
  )
}

export default EntryCard
