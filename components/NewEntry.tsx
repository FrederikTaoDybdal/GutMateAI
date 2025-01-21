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
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <span className="text-3xl">New Entry</span>
        )}
        {error && (
          <p className="text-red-500 mt-2 text-sm">{error}</p>
        )}
      </div>
    </div>
  )
}

export default NewEntry
