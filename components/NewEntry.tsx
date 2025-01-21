'use client'

import { newEntry } from '@/util/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Spinner from './Spinner'

const NewEntry = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOnClick = async () => {
    try {
      setIsLoading(true)
      setError('')
      const { data } = await newEntry()
      console.log('New entry created:', data)
      router.push(`/journal/${data.id}`)
    } catch (err) {
      console.error('Failed to create entry:', err)
      setError('Failed to create entry')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleOnClick}
      disabled={isLoading}
      className="w-full lg:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center">
          <Spinner className="mr-2" />
          <span className="ml-2">Creating...</span>
        </div>
      ) : (
        <>
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Entry</span>
        </>
      )}
      {error && (
        <p className="absolute top-full left-0 mt-1 text-red-500 text-sm">{error}</p>
      )}
    </button>
  )
}

export default NewEntry
