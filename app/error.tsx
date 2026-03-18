'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-[var(--red)] text-[48px] font-mono font-medium mb-4">ERR</div>
        <div className="text-[var(--white)] text-[16px] font-mono mb-2">
          something went wrong.
        </div>
        <div className="text-[var(--muted)] text-[13px] font-mono mb-8 max-w-md">
          {error.message || 'an unexpected error occurred. please try again.'}
        </div>
        <button
          onClick={reset}
          className="px-4 py-2 text-[12px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--bg)] transition-colors duration-150 cursor-crosshair font-mono"
        >
          [retry]
        </button>
      </div>
    </main>
  )
}
