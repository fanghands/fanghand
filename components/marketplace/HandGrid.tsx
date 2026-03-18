'use client'

import { motion } from 'framer-motion'

interface HandGridProps {
  children: React.ReactNode
  loading?: boolean
}

function SkeletonCard() {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] animate-pulse">
      <div className="px-5 pt-4 pb-2">
        <div className="h-4 w-16 bg-[var(--muted-2)]" />
      </div>
      <div className="px-5 pb-3">
        <div className="h-5 w-32 bg-[var(--muted-2)] mb-2" />
        <div className="h-3 w-full bg-[var(--muted-2)] mb-1" />
        <div className="h-3 w-3/4 bg-[var(--muted-2)]" />
      </div>
      <div className="px-5 pb-3 space-y-2">
        <div className="h-3 w-28 bg-[var(--muted-2)]" />
        <div className="h-3 w-24 bg-[var(--muted-2)]" />
        <div className="h-3 w-32 bg-[var(--muted-2)]" />
      </div>
      <div className="px-5 pb-3 border-t border-[var(--border)] pt-3">
        <div className="h-3 w-40 bg-[var(--muted-2)]" />
      </div>
      <div className="px-5 pb-4 flex gap-3">
        <div className="h-8 w-28 bg-[var(--muted-2)]" />
        <div className="h-8 w-20 bg-[var(--muted-2)]" />
      </div>
    </div>
  )
}

export function HandGrid({ children, loading }: HandGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {children}
    </motion.div>
  )
}
