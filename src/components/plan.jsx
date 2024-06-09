import Box from '@/components/ui/box.jsx'
import { cn } from '@/lib/utils.js'
import PropTypes from 'prop-types'
import React from 'react'
import { useGames } from '@/lib/hooks/useGames.js'

export default function Plan({ className, ...props }) {
  const games = useGames()

  const gamesByType = games
    ? games.reduce((acc, game) => {
        if (!acc[game.type]) {
          acc[game.type] = []
        }
        acc[game.type].push(game)
        return acc
      }, {})
    : {}

  const plan = Object.entries(gamesByType)
    .filter(([type]) => type !== 'Halbfinale' && type !== 'Finale')
    .map(([type, games]) => (
      <Box key={type} className="flex grow flex-col gap-2 p-5">
        <h3 className="text-lg font-bold tracking-tight">{type}</h3>
        <div className="mx-3 grid auto-cols-auto grid-cols-[0.1fr_0.8fr_0.1fr_0.8fr_0.2fr]">
          <h5 className="text-right font-semibold">Feld</h5>
          <h5 className="col-span-3 text-center font-semibold">Spielpaarung</h5>
          <h5 className="text-right font-semibold">Uhrzeit</h5>
          {games.map((game, gameIndex) => (
            <React.Fragment key={gameIndex}>
              <p className="text-center">{game.field ? game.field : '?'}</p>
              <p className="truncate text-right">{game.team1 ? game.team1 : '?'}</p>
              <p className="mx-2 text-center font-semibold">
                {game.score1 !== undefined ? game.score1 : '-'}:{game.score2 !== undefined ? game.score2 : '-'}
              </p>
              <p className="truncate text-left">{game.team2 ? game.team2 : '?'}</p>
              <p className="text-right">{game.startTime ? game.startTime.toTimeString().slice(0, 5) : '--:--'}</p>
            </React.Fragment>
          ))}
        </div>
      </Box>
    ))

  return (
    <div className={cn('flex h-full flex-col flex-wrap gap-3', className)} {...props}>
      {plan}
    </div>
  )
}

Plan.propTypes = {
  className: PropTypes.string,
}
