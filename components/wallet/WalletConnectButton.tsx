'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function WalletConnectButton() {
  const router = useRouter()
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const user = localStorage.getItem('fh_user')
    if (user) {
      try {
        const parsed = JSON.parse(user)
        setConnected(true)
        const addr = parsed.wallet_address || ''
        setAddress(addr.slice(0, 4) + '...' + addr.slice(-4))
      } catch {}
    }
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!connected) {
    return (
      <button
        onClick={() => router.push('/login')}
        className="border border-[var(--border)] text-[12px] text-[var(--muted)] px-3 py-1.5 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150 font-mono"
      >
        [connect wallet]
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="border border-[var(--border)] text-[12px] px-3 py-1.5 hover:border-[var(--green)] transition-all duration-150 font-mono flex items-center gap-2"
      >
        <span className="text-[var(--white)]">{address}</span>
      </button>
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-1 border border-[var(--border)] bg-[var(--surface)] p-2 z-50 min-w-[160px]">
          <button
            onClick={() => {
              localStorage.removeItem('fh_token')
              localStorage.removeItem('fh_refresh_token')
              localStorage.removeItem('fh_user')
              setConnected(false)
              setDropdownOpen(false)
              router.push('/login')
            }}
            className="w-full text-left text-[12px] text-[var(--muted)] hover:text-[var(--red)] px-2 py-1 font-mono"
          >
            [disconnect]
          </button>
        </div>
      )}
    </div>
  )
}
