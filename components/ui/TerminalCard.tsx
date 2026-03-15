'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TerminalCardProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export function TerminalCard({ children, className, animate = false }: TerminalCardProps) {
  const Wrapper = animate ? motion.div : 'div'
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4 },
      }
    : {}

  return (
    <Wrapper
      {...(animProps as object)}
      className={clsx(
        'border border-[var(--border)] bg-[var(--surface)] p-5',
        'hover:border-[var(--border-active)] transition-colors duration-200',
        className
      )}
    >
      {children}
    </Wrapper>
  )
}
