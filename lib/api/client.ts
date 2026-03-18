// TODO: Replace with real API base URL from environment
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.fanghand.xyz'

interface FetchOptions extends RequestInit {
  token?: string
}

export class ApiError extends Error {
  status: number
  detail?: string

  constructor(status: number, message: string, detail?: string) {
    super(message)
    this.status = status
    this.detail = detail
    this.name = 'ApiError'
  }
}

export async function apiClient<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // TODO: When backend is ready, uncomment the real fetch below
  // const response = await fetch(`${BASE_URL}${path}`, {
  //   ...fetchOptions,
  //   headers,
  // })
  //
  // if (!response.ok) {
  //   const body = await response.json().catch(() => ({}))
  //   throw new ApiError(response.status, body.error || 'Request failed', body.detail)
  // }
  //
  // return response.json()

  // For now, this function is not called directly - each API module returns mock data
  void BASE_URL
  void headers
  throw new ApiError(501, 'API not yet connected — using mock data')
}
