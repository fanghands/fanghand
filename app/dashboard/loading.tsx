export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-[var(--border)] bg-[var(--surface)] p-4 h-[90px]">
            <div className="h-3 w-16 bg-[var(--muted-2)] mb-2" />
            <div className="h-5 w-12 bg-[var(--muted-2)]" />
          </div>
        ))}
      </div>
      {/* Cards skeleton */}
      <div>
        <div className="h-3 w-24 bg-[var(--muted-2)] mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-[var(--border)] bg-[var(--surface)] p-4 h-[120px]">
              <div className="h-3 w-20 bg-[var(--muted-2)] mb-4" />
              <div className="h-2 w-full bg-[var(--muted-2)] mb-2" />
              <div className="h-2 w-3/4 bg-[var(--muted-2)]" />
            </div>
          ))}
        </div>
      </div>
      {/* Table skeleton */}
      <div>
        <div className="h-3 w-24 bg-[var(--muted-2)] mb-3" />
        <div className="border border-[var(--border)] bg-[var(--surface)]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 p-3 border-b border-[var(--border)]">
              <div className="h-2 w-20 bg-[var(--muted-2)]" />
              <div className="h-2 w-16 bg-[var(--muted-2)]" />
              <div className="h-2 w-12 bg-[var(--muted-2)]" />
              <div className="h-2 w-10 bg-[var(--muted-2)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
