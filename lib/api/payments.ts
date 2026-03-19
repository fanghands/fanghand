import { apiClient, BASE_URL } from './client'
import type { CreditBalance } from '@/types/payment'

export async function createStripeSession(data: {
  hand_id: string
  price_id: string
  success_url: string
  cancel_url: string
  config: Record<string, unknown>
}): Promise<{ checkout_url: string }> {
  return apiClient<{ checkout_url: string }>('/api/v1/payments/stripe/create-session', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getStripePortalUrl(): Promise<{ url: string }> {
  return apiClient<{ url: string }>('/api/v1/payments/stripe/portal')
}

export async function depositCredit(data: {
  tx_signature: string
  lamports: number
}): Promise<CreditBalance> {
  return apiClient<CreditBalance>('/api/v1/payments/credit/deposit', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getCreditBalance(): Promise<CreditBalance> {
  return apiClient<CreditBalance>('/api/v1/payments/credit/balance')
}

export async function getPaymentHistory(cursor?: string) {
  const qs = cursor ? `?cursor=${cursor}` : ''
  return apiClient(`/api/v1/payments/history${qs}`)
}

export async function getBurnHistory(cursor?: string) {
  const qs = cursor ? `?cursor=${cursor}` : ''
  return apiClient(`/api/v1/payments/burns${qs}`)
}

export async function getBurnStats() {
  return apiClient<{ total_burned: number; total_events: number; last_burn_at: string | null }>(
    '/api/v1/payments/burns/stats'
  )
}

export function getBurnStreamUrl(): string {
  return `${BASE_URL}/api/v1/payments/burns/stream`
}
