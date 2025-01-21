const createURL = (path: string): string => window.location.origin + path

export const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  const res = await fetch(...args)
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'An error occurred' }))
    throw new Error(error.error || 'An error occurred')
  }
  return res.json()
}

export const deleteEntry = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'DELETE',
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    const error = await res.json().catch(() => ({ error: 'Failed to delete entry' }))
    throw new Error(error.error || 'Failed to delete entry')
  }
}

export const newEntry = async () => {
  console.log('Creating new entry...')
  const res = await fetch(
    new Request(createURL('/api/entry'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: '' }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    console.log('Entry created successfully:', data)
    return data
  } else {
    const error = await res.json().catch(() => ({ error: 'Failed to create entry' }))
    console.error('Failed to create entry:', error)
    throw new Error(error.error || 'Failed to create entry')
  }
}

interface EntryUpdates {
  content?: string;
}

export const updateEntry = async (id: string, updates: EntryUpdates) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    const error = await res.json().catch(() => ({ error: 'Failed to update entry' }))
    throw new Error(error.error || 'Failed to update entry')
  }
}

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    const error = await res.json().catch(() => ({ error: 'Failed to ask question' }))
    throw new Error(error.error || 'Failed to ask question')
  }
}
