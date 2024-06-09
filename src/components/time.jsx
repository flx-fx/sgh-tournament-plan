import { cn } from '@/lib/utils.js'
import Card from '@/components/ui/card.jsx'
import { useTime } from '@/lib/hooks/useTime.js'
import PropTypes from 'prop-types'

export default function Time({ className, ...props }) {
  const now = useTime()

  const locale = 'de'
  const time = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })

  return (
    <Card className={cn('flex flex-wrap border-zinc-600 bg-zinc-800 text-white', className)} {...props}>
      <p className="text-2xl font-bold">{time}</p>
      <p className="ml-auto text-2xl">SGH</p>
    </Card>
  )
}

Time.propTypes = {
  className: PropTypes.string,
}
