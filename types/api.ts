export interface PaginatedResponse<T> {
  data: T[]
  next_cursor: string | null
  total: number
}

export interface ErrorResponse {
  error: string
  detail?: string
}
