'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { walletConnect } from '@/lib/api/auth'

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
  const [error, setError] = useState<string | null>(null)

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

  const handleConnect = async () => {
    setConnecting(true)
    setError(null)
    try {
      const result = await walletConnect({
        wallet_address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        signature: 'mock_signature',
        message: 'Sign in to FangHand',
        timestamp: Math.floor(Date.now() / 1000),
      })
      localStorage.setItem('fh_token', result.access_token)
      localStorage.setItem('fh_refresh_token', result.refresh_token)
      localStorage.setItem('fh_user', JSON.stringify(result.user))
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'connection failed')
      setConnecting(false)
    }
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
          {error && (
            <div className="text-[12px] text-red-400">{error}</div>
          )}
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
