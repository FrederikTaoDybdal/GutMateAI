import { update } from '@/util/actions'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {
    const data = await request.json()
    console.log('Received data:', data)
    
    const user = await getUserFromClerkID()
    console.log('User:', user)
    
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content: data.content || '',
        status: 'DRAFT',
        analysis: {
          create: {
            mood: 'Neutral',
            subject: 'None',
            negative: false,
            summary: 'None',
            sentimentScore: 0,
            color: '#0101fe',
            userId: user.id,
          },
        },
      },
      include: {
        analysis: true,
      },
    })
    console.log('Created entry:', entry)

    update(['/journal'])

    return NextResponse.json({ data: entry })
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
