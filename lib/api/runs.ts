import { apiClient, BASE_URL } from './client'
import type { Run } from '@/types/run'
import type { PaginatedResponse } from '@/types/api'

export async function fetchRunHistory(
  cursor?: string | null,
  limit?: number
): Promise<PaginatedResponse<Run>> {
  const params = new URLSearchParams()
  if (cursor) params.set('cursor', cursor)
  if (limit) params.set('limit', String(limit))
  const qs = params.toString()
  return apiClient<PaginatedResponse<Run>>(`/api/v1/runs/history${qs ? `?${qs}` : ''}`)
}

export async function fetchRunById(id: string): Promise<Run> {
  return apiClient<Run>(`/api/v1/runs/${id}`)
}

export async function triggerRun(data: {
  hand_id: string
  tier: 'quick' | 'deep'
  config: Record<string, unknown>
  payment_method: string
  solana_tx_signature?: string
}): Promise<Run> {
  return apiClient<Run>('/api/v1/runs', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function cancelRun(id: string): Promise<void> {
  return apiClient<void>(`/api/v1/runs/${id}`, { method: 'DELETE' })
}

export function getRunOutputStreamUrl(id: string): string {
  const token = typeof window !== 'undefined' ? localStorage.getItem('fh_token') : null
  return `${BASE_URL}/api/v1/runs/${id}/output${token ? `?token=${token}` : ''}`
}
