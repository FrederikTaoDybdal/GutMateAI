'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
]

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
          <div className="px-4 py-4 flex items-center justify-between">
            <Link href="/journal" className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                <span className="text-brand-primary">Gut</span>Mate
              </span>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
            >
              <span className="sr-only">Open menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu} />
          <div className="fixed inset-y-0 left-0 z-20 w-full bg-white pb-12 overflow-y-auto">
            <div className="pt-16">
              <nav className="px-4 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 text-base font-medium rounded-md ${
                      pathname === link.href
                        ? 'bg-brand-light text-brand-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 px-8">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="px-6 py-6">
            <Link href="/journal" className="flex items-center">
              <span className="text-2xl font-semibold text-gray-900">
                <span className="text-brand-primary">Gut</span>Mate
              </span>
            </Link>
          </div>
          <nav className="px-4 mt-6 flex-1">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === link.href
                        ? 'bg-brand-light text-brand-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-10 h-16 bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 hidden lg:block">Dashboard</h1>
            <div className="flex items-center space-x-4 ml-auto">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </div>
        </header>
        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
