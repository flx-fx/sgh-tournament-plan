import Box from '@/components/ui/box.jsx'
import { cn, isLargeScreen } from '@/lib/utils.js'
import PropTypes from 'prop-types'
import React from 'react'
import { useGames } from '@/lib/hooks/useGames.js'
import { useNextGames } from '@/lib/hooks/useNextGames.js'

export default function Plan({ className, ...props }) {
  const games = useGames()
  const { cGames } = useNextGames()

  const gamesByType = games.reduce((acc, game) => {
    if (!acc[game.type]) {
      acc[game.type] = []
    }
    acc[game.type].push(game)
    return acc
  }, {})

  const plan = Object.entries(gamesByType)
    .filter(([type]) => type !== 'Halbfinale1' && type !== 'Finale1' && type)
    .map(([type, games]) => (
      <Box
        key={type}
        className={cn(
          'flex grow flex-col gap-2 p-4 lg:p-5',
          [].includes(type) ? 'lg:hidden' : '',
        )}
      >
        <h3 className="text-lg font-bold tracking-tight lg:-mt-2">{type}</h3>
        <div className="mx-1 grid auto-cols-auto grid-cols-[0.1fr_0.8fr_0.1fr_0.8fr_0.2fr] gap-y-[1px] lg:mx-3 *:lg:px-0.5">
          <h5 className="text-left font-semibold">Feld</h5>
          <h5 className="col-span-3 text-center font-semibold">Spielpaarung</h5>
          <h5 className="text-right font-semibold">Uhrzeit</h5>
          {games.map((game, gameIndex) => {if(game.team1 === 'Ismaning' || game.team2 === 'Ismaning') {return('')} else {
            const selected = cGames.some(cGame => cGame.startTime === game.startTime) ? 'bg-red-100' : ''

            return (
              <React.Fragment key={gameIndex}>
                <p className={cn('rounded-l-md text-left', selected)}>{game.fieldName ? isLargeScreen() ? game.fieldName : game.fieldName === 'Hartplatz' ? 'HP' : 'KR' : '?'}</p>
                <p className={cn('truncate text-right', selected)}>{game.team1 ? game.team1 : '?'}</p>
                <p className={cn('text-center font-semibold', selected)}>
                  <span className="mx-2">
                    {game.score1 !== undefined ? game.score1 : '-'}:{game.score2 !== undefined ? game.score2 : '-'}
                  </span>
                </p>
                <p className={cn('truncate text-left', selected)}>{game.team2 ? game.team2 : '?'}</p>
                <p className={cn('rounded-r-md text-right', selected)}>
                  <span className="mr-2">{game.startTime ? game.startTime.toTimeString().slice(0, 5) : '--:--'}</span>
                </p>
              </React.Fragment>
            )}
          })}
        </div>
      </Box>
    ))

  return (
    <div className={cn('flex h-fit flex-col flex-wrap gap-3 lg:h-full', className)} {...props}>
      {plan}
    </div>
  )
}

Plan.propTypes = {
  className: PropTypes.string,
}
