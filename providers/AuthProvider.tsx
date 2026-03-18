'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/lib/store/userStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrateFromStorage = useUserStore((s) => s.hydrateFromStorage)

  useEffect(() => {
    // Hydrate user session from localStorage (handled by zustand persist)
    hydrateFromStorage()
  }, [hydrateFromStorage])

  return <>{children}</>
}
