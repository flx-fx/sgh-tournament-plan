import { cn } from '@/lib/utils.js'

export default function Card({ className, children, ...props }) {
  return (
    <div className={cn('w-full rounded-3xl border-2 bg-white p-4 shadow-df lg:p-5', className)} {...props}>
      {children}
    </div>
  )
}
