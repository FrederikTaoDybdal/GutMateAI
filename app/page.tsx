import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  const href = userId ? '/journal' : '/new-user'

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-pattern" />
        
        {/* Content */}
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Your Personal AI Guide for
              <span className="block text-brand-primary">IBS Food Choices</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-gray-600">
              Get instant, personalized food recommendations during flare-ups, backed by AI and real experiences.
            </p>

            {/* App Features */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: '2-Tap Check-in',
                  description: 'Quick symptom logging that takes seconds, not minutes'
                },
                {
                  title: 'Smart Food Suggestions',
                  description: 'AI-powered recommendations based on your personal triggers'
                },
                {
                  title: 'Pattern Recognition',
                  description: 'Learn from your history and others with similar symptoms'
                }
              ].map((feature) => (
                <div 
                  key={feature.title}
                  className="rounded-xl bg-white/80 backdrop-blur-sm p-6 shadow-lg border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Link 
                href={href}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-brand-primary hover:bg-brand-dark rounded-lg transition-colors duration-200 shadow-sm hover:shadow-lg"
              >
                {userId ? 'Go to Journal' : 'Get Started'}
              </Link>
              <p className="mt-3 text-sm text-gray-500">
                Free during early access period
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
