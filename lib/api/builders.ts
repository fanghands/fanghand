import { apiClient } from './client'

export async function registerAsBuilder(data: {
  bio?: string
  twitter_handle?: string
  github_handle?: string
  payout_usdc_address?: string
}) {
  return apiClient('/api/v1/builders/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getBuilderProfile() {
  return apiClient('/api/v1/builders/me')
}

export async function getBuilderHands() {
  return apiClient('/api/v1/builders/me/hands')
}

export async function submitHand(data: {
  name: string
  description: string
  category: string
  price_monthly_cents?: number
  hand_toml: string
  icon_emoji?: string
}) {
  return apiClient('/api/v1/builders/hands/submit', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getBuilderEarnings() {
  return apiClient('/api/v1/builders/me/earnings')
}
