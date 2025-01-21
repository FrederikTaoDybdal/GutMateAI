import { prisma } from '@/util/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  
  if (!user) {
    throw new Error('No user found')
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!match) {
    const email = user.emailAddresses[0]?.emailAddress
    if (!email) {
      throw new Error('No email address found')
    }

    await prisma.user.create({
      data: {
        clerkId: user.id,
        email,
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
