import { apiClient } from './client'
import type { Activation } from '@/types/activation'
import type { PaginatedResponse } from '@/types/api'

export async function fetchActivations(
  cursor?: string,
  limit?: number
): Promise<PaginatedResponse<Activation>> {
  const params = new URLSearchParams()
  if (cursor) params.set('cursor', cursor)
  if (limit) params.set('limit', String(limit))
  const qs = params.toString()
  return apiClient<PaginatedResponse<Activation>>(`/api/v1/activations${qs ? `?${qs}` : ''}`)
}

export async function fetchActivation(id: string): Promise<Activation> {
  return apiClient<Activation>(`/api/v1/activations/${id}`)
}

export async function createActivation(data: {
  hand_id: string
  config: Record<string, unknown>
  delivery_channel?: string
  delivery_target?: string
  payment_currency: string
  solana_tx_signature?: string
  discount_applied_pct?: number
}): Promise<Activation> {
  return apiClient<Activation>('/api/v1/activations', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function pauseActivation(id: string): Promise<Activation> {
  return apiClient<Activation>(`/api/v1/activations/${id}/pause`, { method: 'POST' })
}

export async function resumeActivation(id: string): Promise<Activation> {
  return apiClient<Activation>(`/api/v1/activations/${id}/resume`, { method: 'POST' })
}

export async function cancelActivation(id: string): Promise<void> {
  return apiClient<void>(`/api/v1/activations/${id}`, { method: 'DELETE' })
}
