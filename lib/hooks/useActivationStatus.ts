'use client'

import { useEffect, useState } from 'react'

type Status = 'active' | 'paused' | 'error' | 'expired'

export function useActivationStatus(initialStatus: Status = 'active') {
  const [status, setStatus] = useState<Status>(initialStatus)

  useEffect(() => {
    const statuses: Status[] = ['active', 'paused', 'active', 'active']
    let i = 0
    const timer = setTimeout(() => {
      i = (i + 1) % statuses.length
      setStatus(statuses[i])
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  return status
}
