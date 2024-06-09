import Field from '@/components/field.jsx'
import Time from '@/components/time.jsx'

export default function App() {
  return (
    <div className="flex h-dvh gap-3 p-6">
      <div className="flex w-1/4 flex-col gap-3">
        <Field index={1} />
        <Field index={2} />
        <Time className="mt-auto" />
      </div>
    </div>
  )
}
