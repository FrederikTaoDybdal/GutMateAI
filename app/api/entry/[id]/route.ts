import { update } from '@/util/actions'
import { analyzeEntry } from '@/util/ai'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await getUserFromClerkID()

    await prisma.journalEntry.delete({
      where: {
        userId_id: {
          id: params.id,
          userId: user.id,
        },
      },
    })

    update(['/journal'])
    return NextResponse.json({ data: { id: params.id } })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    )
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { content } = await request.json()
    console.log('Received content:', content)
    
    const user = await getUserFromClerkID()

    const entry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          id: params.id,
          userId: user.id,
        },
      },
      data: {
        content: content,
      },
      include: {
        analysis: true,
      },
    })

    if (!content || content.trim() === '') {
      return NextResponse.json({ data: entry })
    }

    try {
      const analysis = await analyzeEntry(entry)
      console.log('Analysis result:', analysis)
      
      const savedAnalysis = await prisma.entryAnalysis.upsert({
        where: {
          entryId: entry.id,
        },
        update: { ...analysis },
        create: {
          entryId: entry.id,
          userId: user.id,
          ...analysis,
        },
      })

      update(['/journal'])
      return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
    } catch (analysisError) {
      console.error('Analysis Error:', analysisError)
      // Return the entry even if analysis fails
      return NextResponse.json({ data: entry })
    }
  } catch (error) {
    console.error('PATCH Error:', error)
    return NextResponse.json(
      { error: 'Failed to update entry' },
      { status: 500 }
    )
  }
}
