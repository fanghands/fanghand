'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/lib/store/userStore'
import { getMe } from '@/lib/api/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrateFromStorage = useUserStore((s) => s.hydrateFromStorage)
  const signOut = useUserStore((s) => s.signOut)

  useEffect(() => {
    hydrateFromStorage()

    // Verify token validity on mount
    const token = typeof window !== 'undefined' ? localStorage.getItem('fh_token') : null
    if (token) {
      getMe()
        .then((user) => {
          // Token is valid — store fresh user data
          useUserStore.getState().setUser({
            id: user.id,
            wallet_address: user.wallet_address,
            username: user.username,
            role: user.role as 'user' | 'builder' | 'admin',
            created_at: user.created_at,
          })
        })
        .catch(() => {
          // Token expired or invalid — clear session
          localStorage.removeItem('fh_token')
          localStorage.removeItem('fh_refresh_token')
          localStorage.removeItem('fh_user')
          signOut()
        })
    }
  }, [hydrateFromStorage, signOut])

  return <>{children}</>
}
