import type { Run } from '@/types/run'
import type { PaginatedResponse } from '@/types/api'

// TODO: Replace all mock data with real API calls

const MOCK_RUNS: Run[] = [
  {
    id: 'run-001',
    activation_id: 'act-001',
    hand_name: 'collector-hand',
    status: 'completed',
    tier: 'quick',
    output: '47 sources scanned. 3 critical changes detected. report generated.',
    cost_lamports: 0,
    started_at: '2026-03-18T12:00:00Z',
    completed_at: '2026-03-18T12:02:30Z',
    created_at: '2026-03-18T12:00:00Z',
  },
  {
    id: 'run-002',
    activation_id: 'act-001',
    hand_name: 'collector-hand',
    status: 'completed',
    tier: 'deep',
    output: '50 sources scanned. sentiment shift detected in Solana ecosystem.',
    cost_lamports: 0,
    started_at: '2026-03-18T06:00:00Z',
    completed_at: '2026-03-18T06:05:12Z',
    created_at: '2026-03-18T06:00:00Z',
  },
  {
    id: 'run-003',
    activation_id: 'act-002',
    hand_name: 'twitter-hand',
    status: 'failed',
    tier: 'quick',
    output: null,
    cost_lamports: 0,
    started_at: '2026-03-17T15:00:00Z',
    completed_at: '2026-03-17T15:00:45Z',
    created_at: '2026-03-17T15:00:00Z',
  },
]

export async function fetchRunHistory(
  token: string,
  cursor?: string | null
): Promise<PaginatedResponse<Run>> {
  // TODO: return apiClient<PaginatedResponse<Run>>('/v1/runs', { token })
  void token
  void cursor
  await new Promise((r) => setTimeout(r, 300))
  return { data: MOCK_RUNS, next_cursor: null, total: MOCK_RUNS.length }
}

export async function triggerRun(
  token: string,
  params: { activation_id: string; tier: 'quick' | 'deep' }
): Promise<Run> {
  // TODO: return apiClient<Run>('/v1/runs', { token, method: 'POST', body: JSON.stringify(params) })
  void token
  await new Promise((r) => setTimeout(r, 500))
  return {
    id: `run-${Date.now()}`,
    activation_id: params.activation_id,
    hand_name: 'collector-hand',
    status: 'queued',
    tier: params.tier,
    output: null,
    cost_lamports: 0,
    started_at: null,
    completed_at: null,
    created_at: new Date().toISOString(),
  }
}
