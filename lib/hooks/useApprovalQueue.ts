'use client'

import { useEffect, useState } from 'react'
import { getApprovalQueue } from '@/lib/api/dashboard'

export interface ApprovalItem {
  id: string
  actionType: 'tweet' | 'trade' | 'email' | 'api_call'
  description: string
  timestamp: string
}

export function useApprovalQueue() {
  const [items, setItems] = useState<ApprovalItem[]>([])

  useEffect(() => {
    let mounted = true

    async function fetch() {
      try {
        const data = await getApprovalQueue() as Array<{
          id: string
          type: string
          title: string
          status: string
          created_at: string
        }>
        if (!mounted) return
        setItems(
          data.map((d) => ({
            id: d.id,
            actionType: (d.type as ApprovalItem['actionType']) || 'api_call',
            description: d.title,
            timestamp: new Date(d.created_at).toLocaleString(),
          }))
        )
      } catch {
        // Not authenticated or API unavailable
      }
    }

    fetch()
    return () => { mounted = false }
  }, [])

  const approve = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))
  const reject = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  return { items, approve, reject }
}
