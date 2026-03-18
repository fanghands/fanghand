import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-[var(--green)] text-[48px] font-mono font-medium mb-4">404</div>
        <div className="text-[var(--white)] text-[16px] font-mono mb-2">
          page not found.
        </div>
        <div className="text-[var(--muted)] text-[13px] font-mono mb-8">
          the requested resource does not exist on this server.
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link
            href="/"
            className="text-[var(--green)] text-[13px] hover:text-[var(--white)] transition-colors duration-150 font-mono"
          >
            [home]
          </Link>
          <Link
            href="/marketplace"
            className="text-[var(--green)] text-[13px] hover:text-[var(--white)] transition-colors duration-150 font-mono"
          >
            [marketplace]
          </Link>
        </div>
      </div>
    </main>
  )
}
