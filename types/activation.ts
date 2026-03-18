export interface Activation {
  id: string
  hand_id: string
  hand_name: string
  hand_emoji: string
  user_address: string
  status: 'active' | 'paused' | 'error' | 'expired'
  config: Record<string, unknown>
  payment_method: string
  created_at: string
  next_run_at: string | null
  total_runs: number
  last_run_status: 'completed' | 'failed' | 'running' | null
}
