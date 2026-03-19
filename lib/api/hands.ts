import { apiClient } from './client'
import type { Hand, HandFilter, HandReview } from '@/types/hand'
import type { PaginatedResponse } from '@/types/api'

export async function fetchHands(
  filters?: HandFilter,
  cursor?: string | null
): Promise<PaginatedResponse<Hand>> {
  const searchParams = new URLSearchParams()
  if (filters?.category && filters.category !== 'all') searchParams.set('category', filters.category)
  if (filters?.badge) searchParams.set('badge', filters.badge)
  if (filters?.price) searchParams.set('price', filters.price)
  if (filters?.search) searchParams.set('search', filters.search)
  if (filters?.sort) searchParams.set('sort', filters.sort)
  if (cursor) searchParams.set('cursor', cursor)

  const qs = searchParams.toString()
  return apiClient<PaginatedResponse<Hand>>(`/api/v1/hands${qs ? `?${qs}` : ''}`)
}

export async function fetchHandBySlug(slug: string): Promise<Hand | null> {
  return apiClient<Hand>(`/api/v1/hands/${slug}`)
}

export async function fetchHandReviews(slug: string, cursor?: string): Promise<HandReview[]> {
  const qs = cursor ? `?cursor=${cursor}` : ''
  const res = await apiClient<PaginatedResponse<HandReview>>(`/api/v1/hands/${slug}/reviews${qs}`)
  return res.data
}

export async function submitReview(
  slug: string,
  rating: number,
  comment: string
): Promise<HandReview> {
  return apiClient<HandReview>(`/api/v1/hands/${slug}/review`, {
    method: 'POST',
    body: JSON.stringify({ rating, comment }),
  })
}
