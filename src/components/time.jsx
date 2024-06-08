import { cn, useTime } from '@/lib/utils.js'
import React from 'react'
import Card from '@/components/ui/card.jsx'

export default function Time({ className, ...props }) {
  const now = useTime()

  const locale = 'de'
  const time = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })

  return (
    <Card className={cn('flex flex-wrap bg-zinc-900 text-white', className)} {...props}>
      <p className="text-2xl font-bold">{time}</p>
      <p className="ml-auto text-2xl">SGH</p>
    </Card>
  )
}
