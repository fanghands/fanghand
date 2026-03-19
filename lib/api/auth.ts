import { apiClient } from './client'

export async function walletConnect(data: {
  wallet_address: string
  signature: string
  message: string
  timestamp: number
}) {
  return apiClient<{
    access_token: string
    refresh_token: string
    token_type: string
    user: { id: string; username: string | null; wallet_address: string; is_builder: boolean }
  }>('/api/v1/auth/wallet-connect', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function refreshToken(refresh_token: string) {
  return apiClient<{ access_token: string; token_type: string }>('/api/v1/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token }),
  })
}

export async function getMe() {
  return apiClient<{
    id: string
    wallet_address: string
    username: string | null
    role: string
    created_at: string
  }>('/api/v1/auth/me')
}

export async function updateMe(data: { username?: string; display_name?: string; bio?: string }) {
  return apiClient('/api/v1/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}
