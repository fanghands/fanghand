'use client'

import { useState } from 'react'

export function useFGHBalance() {
  const [balance] = useState(15000)
  return balance
}
