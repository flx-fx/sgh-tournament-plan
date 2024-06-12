import { cn } from '@/lib/utils.js'
import React from 'react'
import Box from '@/components/ui/box.jsx'
import PropTypes from 'prop-types'
import { useScores } from '@/lib/hooks/useScores.js'

export default function Leaderboard({ className, ...props }) {
  const scores = useScores()

  const scoresByType = scores
    ? scores.reduce((acc, game) => {
        if (!acc[game.type]) {
          acc[game.type] = []
        }
        acc[game.type].push(game)
        return acc
      }, {})
    : {}

  const highlighted = (type, index) =>
    type === 'Hauptrunde' && index < 4
      ? 'bg-orange-100'
      : type === 'Hauptrunde' && index >= 4
        ? 'bg-zinc-100'
        : /Vorrunde - \w+/g.test(type) && index < 2
          ? 'bg-red-50'
          : ''

  const leaderboard = Object.entries(scoresByType).map(([type, scores]) => (
    <Box key={type} className="flex grow flex-col gap-2 p-4 lg:p-5">
      <h3 className="text-lg font-bold tracking-tight">{type}</h3>
      <div className="mx-1 grid auto-cols-auto grid-cols-[0.1fr_1fr_0.1fr_0fr_0.1fr_0.1fr_0.1fr] gap-y-0.5 *:px-0.5 lg:mx-3">
        <h5 className="text-center font-semibold">Pl.</h5>
        <h5 className="text-left font-semibold">Team</h5>
        <h5 className="text-center font-semibold">T</h5>
        <h5 className="text-center font-semibold"></h5>
        <h5 className="text-center font-semibold">G</h5>
        <h5 className="text-center font-semibold">D</h5>
        <h5 className="text-center font-semibold">P</h5>
        {scores.map((score, scoreIndex) => (
          <React.Fragment key={scoreIndex}>
            <p className={cn('rounded-l-md text-right', highlighted(type, scoreIndex))}>
              <span className="mr-1">{score.rank ? score.rank : '?'}.</span>
            </p>
            <p className={cn('truncate text-left', highlighted(type, scoreIndex))}>{score.team ? score.team : '0'}</p>
            <p className={cn('text-center', highlighted(type, scoreIndex))}>{score.t ? score.t : '0'}</p>
            <p className={cn('text-center', highlighted(type, scoreIndex))}>:</p>
            <p className={cn('text-center', highlighted(type, scoreIndex))}>{score.g ? score.g : '0'}</p>
            <p className={cn('text-center', highlighted(type, scoreIndex))}>{score.d ? score.d : '0'}</p>
            <p className={cn('rounded-r-md text-center', highlighted(type, scoreIndex))}>{score.p ? score.p : '0'}</p>
          </React.Fragment>
        ))}
      </div>
    </Box>
  ))

  return (
    <div className={cn('flex h-fit flex-col flex-wrap gap-3 lg:h-full', className)} {...props}>
      {leaderboard}
      <Box className="p-4">
        <span className="flex flex-row items-center gap-1">
          <div className="h-5 w-5 rounded-md bg-red-50" />
          <p>= Einzug in Hauptrunde</p>
        </span>
        <span className="flex flex-row items-center gap-1">
          <div className="h-5 w-5 rounded-md bg-orange-100" />
          <p>= Einzug ins Halbfinale</p>
        </span>
        <span className="flex flex-row items-center gap-1">
          <div className="h-5 w-5 rounded-md bg-zinc-100" />
          <p>= Spiel um Platz 5</p>
        </span>
      </Box>
    </div>
  )
}

Leaderboard.propTypes = {
  className: PropTypes.string,
}
