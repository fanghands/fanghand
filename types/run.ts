export interface Run {
  id: string
  activation_id: string
  hand_name: string
  status: 'queued' | 'running' | 'completed' | 'failed'
  tier: 'quick' | 'deep'
  output: string | null
  cost_lamports: number
  started_at: string | null
  completed_at: string | null
  created_at: string
}
