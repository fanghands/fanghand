export interface Hand {
  id: string
  slug: string
  name: string
  emoji: string
  badge: 'OFFICIAL' | 'COMMUNITY'
  category: string[]
  description: string
  features: string[]
  author: string
  author_verified: boolean
  version: string
  activations: number
  rating: number
  reviews_count: number
  price_monthly_cents: number | null  // null = free
  price_per_run_cents: number | null
  toml_preview: string
  system_prompt_preview: string | null
  settings_schema: Record<string, { type: string; default: unknown; description: string }> | null
  status: 'active' | 'pending' | 'deprecated'
  created_at: string
  updated_at: string
}

export interface HandReview {
  id: string
  user_address: string
  rating: number
  comment: string
  created_at: string
}

export interface HandFilter {
  category?: string
  badge?: string
  price?: 'free' | 'paid'
  search?: string
  sort?: 'popular' | 'newest' | 'rating'
}
