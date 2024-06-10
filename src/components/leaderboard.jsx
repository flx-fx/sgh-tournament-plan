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

  const leaderboard = Object.entries(scoresByType).map(([type, scores]) => (
    <Box key={type} className="flex grow flex-col gap-2 p-4 lg:p-5">
      <h3 className="text-lg font-bold tracking-tight">{type}</h3>
      <div className="mx-1 grid auto-cols-auto grid-cols-[0.1fr_1fr_0.1fr_0fr_0.1fr_0.1fr_0.1fr] gap-x-1 lg:mx-3">
        <h5 className="text-center font-semibold">Pl.</h5>
        <h5 className="text-left font-semibold">Team</h5>
        <h5 className="text-center font-semibold">T</h5>
        <h5 className="text-center font-semibold"></h5>
        <h5 className="text-center font-semibold">G</h5>
        <h5 className="text-center font-semibold">D</h5>
        <h5 className="text-center font-semibold">P</h5>
        {scores.map((score, scoreIndex) => (
          <React.Fragment key={scoreIndex}>
            <p className="mr-1 text-right">{score.rank ? score.rank : '?'}.</p>
            <p className="truncate text-left">{score.team ? score.team : '?'}</p>
            <p className="text-center">{score.t ? score.t : '?'}</p>
            <p className="text-center">:</p>
            <p className="text-center">{score.g ? score.g : '?'}</p>
            <p className="text-center">{score.d ? score.d : '?'}</p>
            <p className="text-center">{score.p ? score.p : '?'}</p>
          </React.Fragment>
        ))}
      </div>
    </Box>
  ))

  return (
    <div className={cn('flex h-fit flex-col flex-wrap gap-3 lg:h-full', className)} {...props}>
      {leaderboard}
    </div>
  )
}

Leaderboard.propTypes = {
  className: PropTypes.string,
}
