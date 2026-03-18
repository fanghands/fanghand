'use client'

import { useEffect, useRef } from 'react'
import { useRunStream } from '@/lib/hooks/useRunStream'
import { HandStatusBadge } from './HandStatusBadge'

export function RunOutputViewer() {
  const { lines, isStreaming, startStream } = useRunStream()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] font-mono text-[12px]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)]">
        <span className="text-[var(--muted)]">run output</span>
        <div className="flex items-center gap-2">
          <HandStatusBadge status={isStreaming ? 'active' : lines.length > 0 ? 'paused' : 'expired'} />
          {!isStreaming && (
            <button
              onClick={startStream}
              className="border border-[var(--border)] px-2 py-0.5 text-[var(--muted)] hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150"
            >
              [run]
            </button>
          )}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="p-3 h-[300px] overflow-y-auto bg-[var(--bg)]"
      >
        <pre className="text-[var(--green)] whitespace-pre-wrap">
          {lines.length === 0 && (
            <span className="text-[var(--muted)]">waiting for run...</span>
          )}
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {isStreaming && <span className="animate-blink">_</span>}
        </pre>
      </div>
    </div>
  )
}
