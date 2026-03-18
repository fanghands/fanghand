'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { WalletBalance } from '@/components/wallet/WalletBalance'

const NAV_ITEMS = [
  { href: '/builders', label: 'overview' },
  { href: '/builders/hands', label: 'my hands' },
  { href: '/builders/hands/new', label: 'submit hand' },
  { href: '/builders/earnings', label: 'earnings' },
  { href: '/builders/staking', label: 'staking' },
]

export default function BuildersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Mock builder role check
    const token = localStorage.getItem('fh_token')
    const role = localStorage.getItem('fh_role')
    setAuthorized(!!token && role === 'builder')
  }, [])

  if (!mounted) return null

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center font-mono text-[14px]">
        <div className="border border-[var(--border)] bg-[var(--surface)] p-8 text-center max-w-sm">
          <div className="text-[var(--muted)] mb-4">builder access required</div>
          <div className="text-[var(--white)] mb-4">
            you need a builder account to access this portal
          </div>
          <Link
            href="/login"
            className="inline-block border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
          >
            [connect wallet]
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex font-mono text-[12px]">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-[200px] border-r border-[var(--border)] bg-[var(--surface)] shrink-0">
        <div className="p-4 border-b border-[var(--border)]">
          <Link href="/" className="text-[var(--green)] text-[14px]">
            fanghand
          </Link>
          <div className="text-[10px] text-[var(--muted)] mt-0.5">builder portal</div>
        </div>
        <nav className="p-2 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/builders'
                ? pathname === '/builders'
                : pathname.startsWith(item.href) && item.href !== '/builders'
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 mb-0.5 transition-all duration-150 ${
                  isActive
                    ? 'text-[var(--green)] bg-[var(--green)]/5 border-l-2 border-[var(--green)]'
                    : 'text-[var(--muted)] hover:text-[var(--white)] border-l-2 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-4 py-3">
        <div>
          <Link href="/" className="text-[var(--green)]">fanghand</Link>
          <span className="text-[10px] text-[var(--muted)] ml-2">builder</span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[var(--muted)] hover:text-[var(--white)]"
        >
          {menuOpen ? '[close]' : '[menu]'}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-[var(--bg)]/95 pt-[50px]">
          <nav className="p-4">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/builders'
                  ? pathname === '/builders'
                  : pathname.startsWith(item.href) && item.href !== '/builders'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-3 text-[14px] ${
                    isActive ? 'text-[var(--green)]' : 'text-[var(--muted)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-3 flex items-center justify-between">
          <span className="text-[var(--muted)]">builder portal</span>
          <WalletBalance />
        </header>
        <div className="flex-1 p-6 md:pt-6 pt-16 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
