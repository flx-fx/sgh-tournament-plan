import { cn } from '@/lib/utils.js'

export default function Box({ className, children, ...props }) {
  return (
    <div className={cn('rounded-xl border', className)} {...props}>
      {children}
    </div>
  )
}
