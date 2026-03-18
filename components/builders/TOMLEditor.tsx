'use client'

import { useState, useMemo } from 'react'

interface TOMLEditorProps {
  value: string
  onChange: (value: string) => void
}

export function TOMLEditor({ value, onChange }: TOMLEditorProps) {
  const lines = value.split('\n')

  const highlighted = useMemo(() => {
    return lines.map((line) => {
      // Section headers [section]
      if (/^\s*\[.+\]/.test(line)) {
        return `<span style="color:var(--blue)">${escapeHtml(line)}</span>`
      }
      // Key = value
      const match = line.match(/^(\s*\w[\w.-]*)(\s*=\s*)(.*)$/)
      if (match) {
        return `<span style="color:var(--green)">${escapeHtml(match[1])}</span><span style="color:var(--muted)">${escapeHtml(match[2])}</span><span style="color:var(--white)">${escapeHtml(match[3])}</span>`
      }
      // Comments
      if (/^\s*#/.test(line)) {
        return `<span style="color:var(--muted)">${escapeHtml(line)}</span>`
      }
      return escapeHtml(line)
    })
  }, [lines])

  return (
    <div className="border border-[var(--border)] bg-[var(--bg)] font-mono text-[12px] relative">
      <div className="flex">
        <div className="select-none text-right pr-2 pt-2 pb-2 pl-2 text-[var(--muted-2)] border-r border-[var(--border)] min-w-[40px]">
          {lines.map((_, i) => (
            <div key={i} className="leading-[1.6]">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="relative flex-1">
          <pre
            className="absolute inset-0 p-2 pointer-events-none overflow-auto leading-[1.6]"
            aria-hidden
            dangerouslySetInnerHTML={{ __html: highlighted.join('\n') }}
          />
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            className="w-full h-full min-h-[300px] p-2 bg-transparent text-transparent caret-[var(--green)] resize-y focus:outline-none leading-[1.6]"
          />
        </div>
      </div>
    </div>
  )
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
