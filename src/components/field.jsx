import Card from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import Box from '@/components/ui/box.jsx'
import { LucideClock } from 'lucide-react'
import { cn } from '@/lib/utils.js'
import { Progress } from '@/components/ui/progress.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import PropTypes from 'prop-types'
import { useGames } from '@/lib/hooks/useGames.js'
import { useNextGames } from '@/lib/hooks/useNextGames.js'
import { useTime } from '@/lib/hooks/useTime.js'

export default function Field({ className, index, ...props }) {
  const games = useGames()
  const now = useTime()

  const gamesOnField = games.filter(game => game.field === parseInt(index)).sort(game => game.startTime)
  const { cGame, n1Game, n2Game } = useNextGames(gamesOnField, now)

  const timePassedMs = cGame ? now - cGame.startTime : -1
  const timePassed = cGame ? Math.floor(timePassedMs / 1000 / 60) : -1
  const durationMs = cGame ? cGame.endTime - cGame.startTime : -1

  return (
    <Card className={cn('flex flex-col gap-3 bg-white', className)} {...props}>
      <span className="flex items-center gap-2">
        <h3 className="text-2xl font-bold tracking-tight">Feld {index}</h3>
        {cGame ? <Badge className="bg-red-300">{cGame.type}</Badge> : ''}
        {timePassed !== -1 ? (
          <p className="ml-auto text-2xl font-medium text-zinc-500">
            <LucideClock className="relative -top-[1px] mr-1 inline-block" />
            {timePassed}
          </p>
        ) : (
          ''
        )}
      </span>
      <Box className="relative overflow-hidden p-3">
        <div className="mx-3 grid h-40 grid-cols-3 items-center">
          <p className="w-full overflow-hidden text-ellipsis text-center text-xl font-semibold">
            {cGame ? cGame.team1 : '-'}
          </p>
          <h1 className="text-center text-6xl font-bold">
            {cGame ? (cGame.score1 ? cGame.score1 : '0') + ':' + (cGame.score2 ? cGame.score2 : '0') : '-:-'}
          </h1>
          <p className="w-full overflow-hidden text-ellipsis text-center text-xl font-semibold">
            {cGame ? cGame.team2 : '-'}
          </p>
        </div>
        <Progress value={(timePassedMs / durationMs) * 100} className="absolute bottom-0 left-0 rounded-none" />
      </Box>
      {!(!n1Game && !n2Game) ? (
        <>
          <Separator />
          <h4 className="mx-3 -mb-1 text-xl font-bold tracking-tight">Nächste Spiele</h4>
          <Box className="relative overflow-hidden p-3">
            <div className="flex gap-3">
              <div className="grow overflow-hidden">
                <h5 className="truncate font-semibold">{n1Game.team1}</h5>
                <h5 className="truncate font-semibold">{n1Game.team2}</h5>
                <p>{n1Game.startTime.toTimeString().slice(0, 5)}</p>
              </div>
              {n2Game ? (
                <>
                  <div className="h-16 border-l" />
                  <div className="grow overflow-hidden">
                    <h5 className="truncate font-semibold">{n2Game.team1}</h5>
                    <h5 className="truncate font-semibold">{n2Game.team2}</h5>
                    <p>{n2Game.startTime.toTimeString().slice(0, 5)}</p>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </Box>
        </>
      ) : (
        ''
      )}
    </Card>
  )
}

Field.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
}
