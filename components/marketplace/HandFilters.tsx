'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

const FILTERS = ['all', 'official', 'community', 'crypto', 'research', 'social', 'automation', 'free'] as const

export function HandFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const active = searchParams.get('filter') || 'all'

  const setFilter = useCallback(
    (filter: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (filter === 'all') {
        params.delete('filter')
      } else {
        params.set('filter', filter)
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`px-3 py-1.5 text-[12px] border transition-colors duration-150 cursor-crosshair ${
            active === filter
              ? 'border-[var(--green)] text-[var(--green)]'
              : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)]'
          }`}
        >
          [{filter}]
        </button>
      ))}
    </div>
  )
}
