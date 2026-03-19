'use client'

import { useEffect, useState } from 'react'
import { getBurnStats } from '@/lib/api/payments'

export function useBurnStats() {
  const [totalBurned, setTotalBurned] = useState(0)
  const [lastBurn, setLastBurn] = useState({ amount: 0, ago: 'never' })

  useEffect(() => {
    let mounted = true

    async function fetch() {
      try {
        const stats = await getBurnStats()
        if (!mounted) return
        setTotalBurned(stats.total_burned)
        if (stats.last_burn_at) {
          const diff = Date.now() - new Date(stats.last_burn_at).getTime()
          const mins = Math.floor(diff / 60000)
          const ago = mins < 1 ? 'just now' : mins < 60 ? `${mins}m ago` : `${Math.floor(mins / 60)}h ago`
          setLastBurn({ amount: 0, ago })
        }
      } catch {
        // API unavailable — keep defaults
      }
    }

    fetch()
    const interval = setInterval(fetch, 30000) // poll every 30s
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return { totalBurned, lastBurn }
}
