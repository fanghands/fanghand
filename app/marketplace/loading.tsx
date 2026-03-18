export default function MarketplaceLoading() {
  return (
    <main className="pb-14">
      {/* header skeleton */}
      <div className="px-4 py-3 max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[var(--border)]">
        <div className="h-4 w-40 bg-[var(--muted-2)] animate-pulse" />
        <div className="h-4 w-24 bg-[var(--muted-2)] animate-pulse" />
      </div>

      {/* hero skeleton */}
      <section className="px-4 py-12 max-w-6xl mx-auto w-full">
        <div className="h-10 w-80 bg-[var(--muted-2)] animate-pulse mb-3" />
        <div className="h-4 w-96 bg-[var(--muted-2)] animate-pulse mb-2" />
        <div className="h-4 w-64 bg-[var(--muted-2)] animate-pulse mb-8" />
        <div className="flex gap-6">
          <div className="h-4 w-24 bg-[var(--muted-2)] animate-pulse" />
          <div className="h-4 w-20 bg-[var(--muted-2)] animate-pulse" />
          <div className="h-4 w-28 bg-[var(--muted-2)] animate-pulse" />
        </div>
      </section>

      {/* filter skeleton */}
      <div className="px-4 max-w-6xl mx-auto w-full">
        <div className="flex gap-2 py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-[var(--muted-2)] animate-pulse" />
          ))}
        </div>
      </div>

      {/* grid skeleton */}
      <section className="px-4 py-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-[var(--border)] bg-[var(--surface)] animate-pulse">
              <div className="px-5 pt-4 pb-2"><div className="h-4 w-16 bg-[var(--muted-2)]" /></div>
              <div className="px-5 pb-3">
                <div className="h-5 w-32 bg-[var(--muted-2)] mb-2" />
                <div className="h-3 w-full bg-[var(--muted-2)] mb-1" />
                <div className="h-3 w-3/4 bg-[var(--muted-2)]" />
              </div>
              <div className="px-5 pb-3 space-y-2">
                <div className="h-3 w-28 bg-[var(--muted-2)]" />
                <div className="h-3 w-24 bg-[var(--muted-2)]" />
              </div>
              <div className="px-5 pb-4"><div className="h-8 w-28 bg-[var(--muted-2)]" /></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
