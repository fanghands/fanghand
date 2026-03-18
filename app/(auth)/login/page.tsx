'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const BOOT_LINES = [
  'FangHand OS v0.1.0',
  'initializing terminal...',
  'loading modules...',
  '[ok] wallet adapter',
  '[ok] agent runtime',
  '[ok] marketplace index',
  '',
  'ready.',
  '',
]

export default function LoginPage() {
  const router = useRouter()
  const [lines, setLines] = useState<string[]>([])
  const [bootDone, setBootDone] = useState(false)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      if (idx < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[idx]])
        idx++
      } else {
        setBootDone(true)
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const handleConnect = () => {
    setConnecting(true)
    setTimeout(() => {
      localStorage.setItem('fh_token', 'mock_token_' + Date.now())
      localStorage.setItem('fh_role', 'builder')
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-6">
      {/* Boot sequence */}
      <div className="mb-6 min-h-[200px]">
        <pre className="text-[12px] text-[var(--green)] leading-relaxed">
          {lines.map((line, i) => (
            <div key={i}>{line || '\u00A0'}</div>
          ))}
          {!bootDone && <span className="animate-blink">_</span>}
        </pre>
      </div>

      {bootDone && (
        <div className="text-center space-y-4">
          <div className="text-[14px] text-[var(--white)]">connect wallet to continue</div>
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="border border-[var(--green)] text-[var(--green)] px-6 py-2 text-[12px] hover:bg-[var(--green)] hover:text-black transition-all duration-150 disabled:opacity-50"
          >
            {connecting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">|</span> connecting...
              </span>
            ) : (
              '[connect wallet]'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
