'use client'

import { useState } from 'react'

export interface ApprovalItem {
  id: string
  actionType: 'tweet' | 'trade' | 'email' | 'api_call'
  description: string
  timestamp: string
}

const MOCK_ITEMS: ApprovalItem[] = [
  {
    id: 'appr-1',
    actionType: 'tweet',
    description: 'Post market summary thread (5 tweets)',
    timestamp: '2 min ago',
  },
  {
    id: 'appr-2',
    actionType: 'trade',
    description: 'Swap 0.5 SOL for USDC on Jupiter',
    timestamp: '8 min ago',
  },
  {
    id: 'appr-3',
    actionType: 'api_call',
    description: 'Send webhook to Discord channel',
    timestamp: '15 min ago',
  },
]

export function useApprovalQueue() {
  const [items, setItems] = useState<ApprovalItem[]>(MOCK_ITEMS)

  const approve = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))
  const reject = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  return { items, approve, reject }
}
