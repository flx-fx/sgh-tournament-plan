import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function useTime() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return now
}
