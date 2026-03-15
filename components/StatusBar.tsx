'use client'

import { useState } from 'react'
import { CONTRACT_ADDRESS, CONTRACT_SHORT } from '@/lib/constants'

export function StatusBar() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = CONTRACT_ADDRESS
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 h-9 flex items-center px-4 md:px-6"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-4 text-[11px] text-[var(--muted)] overflow-x-auto whitespace-nowrap w-full">
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="animate-status-pulse text-[var(--green)]">●</span>
          <span>system: ONLINE</span>
        </span>
        <span className="text-[var(--muted-2)]">|</span>
        <span className="shrink-0">agents running: 3/5</span>
        <span className="text-[var(--muted-2)]">|</span>
        <span className="shrink-0">last cycle: 6h ago</span>
        <span className="text-[var(--muted-2)]">|</span>
        <span className="shrink-0">next vote: friday</span>
        <span className="text-[var(--muted-2)]">|</span>
        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center gap-1.5 hover:text-[var(--white)] transition-colors duration-150 cursor-pointer"
          aria-label="copy contract address"
        >
          <span>$FGH:</span>
          <span className="text-[var(--white)]">{CONTRACT_SHORT}</span>
          <span className="text-[var(--muted)]">{copied ? '[copied ✓]' : '[copy]'}</span>
        </button>
      </div>
    </div>
  )
}
