'use client'

import { askQuestion } from '@/util/api'
import { useState } from 'react'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const { data } = await askQuestion(question)

    setAnswer(data)
    setLoading(false)
    setQuestion('')
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Ask AI About Your Symptoms
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 placeholder-gray-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary disabled:opacity-50"
            disabled={loading}
            placeholder="e.g., What foods should I avoid during a flare-up?"
          />
          <button
            disabled={loading}
            type="submit"
            className="inline-flex items-center px-4 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Ask AI'
            )}
          </button>
        </div>
      </form>
      
      {answer && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">AI Response:</h4>
          <p className="text-sm text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default Question
