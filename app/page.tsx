/**
 * MAIN PAGE - Build your UI here!
 *
 * FILE STRUCTURE (DO NOT CHANGE):
 * - app/page.tsx       ← YOU ARE HERE - main page
 * - app/layout.tsx     ← root layout (pre-configured)
 * - app/error.tsx      ← error boundary (pre-configured)
 * - app/not-found.tsx  ← 404 page (pre-configured)
 * - app/loading.tsx    ← loading state (pre-configured)
 * - app/api/           ← API routes
 * - src/components/ui/ ← shadcn/ui components
 * - src/lib/utils.ts   ← cn() helper
 *
 * ⚠️ NEVER create src/app/ - files go in app/ directly!
 * ⚠️ NEVER create error.tsx, not-found.tsx - use the ones here!
 * ⚠️ NEVER import from 'next/document' - App Router doesn't use it!
 */

'use client'

import ChatInterface from '@/components/ChatInterface'

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ChatInterface />
    </main>
  )
}
