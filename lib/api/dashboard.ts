import { apiClient } from './client'

export async function getDashboardOverview() {
  return apiClient('/api/v1/dashboard/overview')
}

export async function getRecentRuns() {
  return apiClient('/api/v1/dashboard/recent-runs')
}

export async function getApprovalQueue() {
  return apiClient('/api/v1/dashboard/approval-queue')
}
