'use client'

import { useState } from 'react'

interface CopyAddressProps {
  value: string
  display?: string
  className?: string
}

export function CopyAddress({ value, display, className }: CopyAddressProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <span className="text-[var(--white)]">{display ?? value}</span>
      <button
        onClick={handleCopy}
        className="text-[11px] text-[var(--muted)] border border-[var(--border)] px-1.5 py-0.5 hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-pointer"
        aria-label="copy to clipboard"
      >
        {copied ? '[copied ✓]' : '[copy]'}
      </button>
    </span>
  )
}
