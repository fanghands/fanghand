export default function HandDetailLoading() {
  return (
    <main className="pb-14">
      {/* header skeleton */}
      <div className="px-4 py-3 max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[var(--border)]">
        <div className="h-4 w-40 bg-[var(--muted-2)] animate-pulse" />
        <div className="h-4 w-32 bg-[var(--muted-2)] animate-pulse" />
      </div>

      {/* breadcrumb skeleton */}
      <div className="px-4 py-3 max-w-6xl mx-auto w-full">
        <div className="h-3 w-48 bg-[var(--muted-2)] animate-pulse" />
      </div>

      {/* detail skeleton */}
      <section className="px-4 py-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div>
            <div className="mb-6">
              <div className="flex gap-3 mb-3">
                <div className="h-5 w-16 bg-[var(--muted-2)] animate-pulse" />
                <div className="h-5 w-12 bg-[var(--muted-2)] animate-pulse" />
              </div>
              <div className="h-8 w-64 bg-[var(--muted-2)] animate-pulse mb-2" />
              <div className="h-4 w-32 bg-[var(--muted-2)] animate-pulse" />
            </div>

            <div className="flex gap-1 mb-6 border-b border-[var(--border)] pb-0">
              <div className="h-10 w-20 bg-[var(--muted-2)] animate-pulse" />
              <div className="h-10 w-20 bg-[var(--muted-2)] animate-pulse" />
              <div className="h-10 w-20 bg-[var(--muted-2)] animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="h-4 w-full bg-[var(--muted-2)] animate-pulse" />
              <div className="h-4 w-3/4 bg-[var(--muted-2)] animate-pulse" />
              <div className="h-4 w-5/6 bg-[var(--muted-2)] animate-pulse" />
              <div className="h-32 w-full bg-[var(--muted-2)] animate-pulse mt-6" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="h-4 w-20 bg-[var(--muted-2)] animate-pulse mb-3" />
              <div className="h-10 w-full bg-[var(--muted-2)] animate-pulse" />
            </div>
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3">
              <div className="h-3 w-12 bg-[var(--muted-2)] animate-pulse" />
              <div className="h-3 w-32 bg-[var(--muted-2)] animate-pulse" />
              <div className="h-3 w-28 bg-[var(--muted-2)] animate-pulse" />
              <div className="h-3 w-24 bg-[var(--muted-2)] animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
