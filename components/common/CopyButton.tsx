'use client'

import { useState, useCallback } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label = '[copy]', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className={`text-[11px] font-mono transition-colors duration-150 cursor-crosshair ${
        copied
          ? 'text-[var(--green)]'
          : 'text-[var(--muted)] hover:text-[var(--white)]'
      } ${className}`}
    >
      {copied ? '[copied]' : label}
    </button>
  )
}
