'use client'
import { updateEntry, deleteEntry } from '@/util/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation'
import type { JournalEntry } from '@/types/journal'

interface EditorProps {
  entry: JournalEntry
}

const Editor = ({ entry }: EditorProps) => {
  const [text, setText] = useState(entry.content)
  const [currentEntry, setEntry] = useState<JournalEntry>(entry)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return
    
    try {
      setIsDeleting(true)
      await deleteEntry(entry.id)
      router.push('/journal')
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete entry')
    } finally {
      setIsDeleting(false)
    }
  }

  useAutosave({
    data: text,
    onSave: async (_text) => {
      try {
        if (_text === entry.content) return
        setIsSaving(true)
        setError('')

        const { data } = await updateEntry(entry.id, { content: _text })
        setEntry(data)
      } catch (err) {
        console.error('Save error:', err)
        setError('Failed to save changes')
      } finally {
        setIsSaving(false)
      }
    },
    interval: 1000,
  })

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <button
                onClick={() => router.push('/journal')}
                className="mr-4 text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="truncate">
                <h1 className="text-xl font-semibold text-gray-900">Journal Entry</h1>
                <p className="mt-1 text-sm text-gray-500 hidden sm:block">
                  {formatDate(entry.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile Analysis Toggle */}
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="lg:hidden inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
              </button>

              {isSaving && (
                <span className="hidden sm:flex items-center text-sm text-gray-500">
                  <Spinner className="mr-2" />
                  Saving...
                </span>
              )}
              {error && (
                <span className="hidden sm:block text-sm text-red-600">{error}</span>
              )}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <Spinner className="mr-2" />
                    <span className="hidden sm:block">Deleting...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:block">Delete Entry</span>
                    <span className="sm:hidden">Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Editor */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="block w-full h-[calc(100vh-20rem)] lg:h-[calc(100vh-16rem)] p-4 text-gray-900 border-0 resize-none focus:ring-0 sm:text-sm"
                placeholder="Write about your meal, symptoms, or how you're feeling..."
              />
            </div>
          </div>

          {/* Analysis Panel */}
          {currentEntry.analysis && (
            <div className={`w-full lg:w-80 space-y-4 order-1 lg:order-2 ${
              showAnalysis ? 'block' : 'hidden lg:block'
            }`}>
              {/* Mood Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Mood</h3>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-light text-brand-primary">
                    {currentEntry.analysis.mood}
                  </span>
                  <span className="text-sm text-gray-500">
                    Score: {currentEntry.analysis.sentimentScore?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Summary</h3>
                <p className="text-sm text-gray-600">{currentEntry.analysis.summary}</p>
              </div>

              {/* Subject Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Subject</h3>
                <p className="text-sm text-gray-600">{currentEntry.analysis.subject}</p>
              </div>

              {/* IBS Impact */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">IBS Impact</h3>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentEntry.analysis.negative 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {currentEntry.analysis.negative ? 'Negative' : 'Positive'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Editor
