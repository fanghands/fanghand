export interface User {
  id: string
  wallet_address: string
  username: string | null
  role: 'user' | 'builder' | 'admin'
  created_at: string
}
