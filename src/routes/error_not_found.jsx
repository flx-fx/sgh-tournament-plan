import Card from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Link } from 'react-router-dom'

export default function ErrorNotFound() {
  return (
    <div className="flex h-dvh items-center justify-center p-6">
      <Card className="flex w-96 flex-col gap-3">
        <h3 className="text-xl font-bold">404 - Seite nicht gefunden</h3>
        <Separator />
        <Button asChild>
          <Link to="/">Zurück zur Übersicht</Link>
        </Button>
      </Card>
    </div>
  )
}
