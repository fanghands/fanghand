'use client'

import { useState } from 'react'

export function useFGHDiscount() {
  const [discount] = useState(20)
  const [fghBalance] = useState(15000)
  return { discount, fghBalance }
}
