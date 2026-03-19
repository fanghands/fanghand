const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

async function getToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('fh_token')
}

async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const body = await res.text()
    throw new ApiError(res.status, body)
  }

  // Handle empty responses (204, etc.)
  const text = await res.text()
  if (!text) return {} as T
  return JSON.parse(text) as T
}

export { apiClient, ApiError, BASE_URL }
