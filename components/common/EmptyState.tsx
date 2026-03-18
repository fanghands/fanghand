'use client'

import { motion } from 'framer-motion'

interface EmptyStateProps {
  message?: string
  submessage?: string
}

export function EmptyState({
  message = 'no results found.',
  submessage,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-20"
    >
      <div className="text-[var(--muted)] text-[13px] font-mono">{message}</div>
      {submessage && (
        <div className="text-[var(--muted-2)] text-[11px] font-mono mt-2">{submessage}</div>
      )}
    </motion.div>
  )
}
