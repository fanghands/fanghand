'use client'

import { FILTER_OPTIONS, type FilterOption } from '@/lib/marketplace-data'

interface FilterBarProps {
  active: FilterOption
  onChange: (filter: FilterOption) => void
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="px-4 max-w-6xl mx-auto w-full">
      <div className="flex flex-wrap gap-2 py-4">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-3 py-1.5 text-[12px] border transition-colors duration-150 cursor-pointer ${
              active === filter
                ? 'border-[var(--green)] text-[var(--green)]'
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)]'
            }`}
          >
            [{filter}]
          </button>
        ))}
      </div>
    </div>
  )
}
