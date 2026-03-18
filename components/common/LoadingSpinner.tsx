'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  text?: string
  size?: 'sm' | 'md'
}

export function LoadingSpinner({ text = 'loading...', size = 'md' }: LoadingSpinnerProps) {
  const frames = ['|', '/', '-', '\\']

  return (
    <div className={`flex items-center gap-2 font-mono ${size === 'sm' ? 'text-[11px]' : 'text-[13px]'}`}>
      <motion.span
        className="text-[var(--green)] inline-block w-[1ch]"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        {frames[0]}
      </motion.span>
      <span className="text-[var(--muted)]">{text}</span>
    </div>
  )
}
