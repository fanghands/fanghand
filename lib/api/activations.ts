import type { Activation } from '@/types/activation'
import type { PaginatedResponse } from '@/types/api'

// TODO: Replace all mock data with real API calls

const MOCK_ACTIVATIONS: Activation[] = [
  {
    id: 'act-001',
    hand_id: 'collector-hand',
    hand_name: 'collector-hand',
    hand_emoji: '\u{1F50D}',
    user_address: 'mock_wallet_address',
    status: 'active',
    config: { sources_per_cycle: 50, sentiment: true },
    payment_method: 'free',
    created_at: '2026-02-01T00:00:00Z',
    next_run_at: '2026-03-18T18:00:00Z',
    total_runs: 142,
    last_run_status: 'completed',
  },
  {
    id: 'act-002',
    hand_id: 'twitter-hand',
    hand_name: 'twitter-hand',
    hand_emoji: '\u{1F426}',
    user_address: 'mock_wallet_address',
    status: 'paused',
    config: { posts_per_day: 3, approval_mode: true },
    payment_method: 'free',
    created_at: '2026-02-10T00:00:00Z',
    next_run_at: null,
    total_runs: 89,
    last_run_status: 'completed',
  },
]

export async function fetchActivations(
  token: string
): Promise<PaginatedResponse<Activation>> {
  // TODO: return apiClient<PaginatedResponse<Activation>>('/v1/activations', { token })
  void token
  await new Promise((r) => setTimeout(r, 300))
  return { data: MOCK_ACTIVATIONS, next_cursor: null, total: MOCK_ACTIVATIONS.length }
}

export async function fetchActivation(
  token: string,
  id: string
): Promise<Activation | null> {
  // TODO: return apiClient<Activation>(`/v1/activations/${id}`, { token })
  void token
  await new Promise((r) => setTimeout(r, 200))
  return MOCK_ACTIVATIONS.find((a) => a.id === id) || null
}

export async function createActivation(
  token: string,
  params: { hand_id: string; config: Record<string, unknown>; payment_method: string }
): Promise<Activation> {
  // TODO: return apiClient<Activation>('/v1/activations', { token, method: 'POST', body: JSON.stringify(params) })
  void token
  await new Promise((r) => setTimeout(r, 800))
  return {
    id: `act-${Date.now()}`,
    hand_id: params.hand_id,
    hand_name: params.hand_id,
    hand_emoji: '\u{1F916}',
    user_address: 'mock_wallet_address',
    status: 'active',
    config: params.config,
    payment_method: params.payment_method,
    created_at: new Date().toISOString(),
    next_run_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    total_runs: 0,
    last_run_status: null,
  }
}

export async function pauseActivation(
  token: string,
  id: string
): Promise<Activation> {
  // TODO: return apiClient<Activation>(`/v1/activations/${id}/pause`, { token, method: 'POST' })
  void token
  await new Promise((r) => setTimeout(r, 400))
  const activation = MOCK_ACTIVATIONS.find((a) => a.id === id)
  if (!activation) throw new Error('Activation not found')
  return { ...activation, status: 'paused', next_run_at: null }
}
