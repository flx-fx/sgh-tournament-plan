import { useEffect, useState } from 'react'
import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import Field from '@/components/field.jsx'
import Time from '@/components/time.jsx'

const SHEET_ID = '10misxU839rVmDjonnHW32vIK6oesNcwEctRMS-tUJHU'
const GAMES_SHEET_NAME = '@UI_games'

function transformGamesData(data) {
  return data.map(game => {
    let newGame = game
    if (game.time) {
      const [startTime, endTime] = game.time.split(' - ').map(time => {
        const [h, m] = time.split(':').map(it => parseInt(it))
        const date = new Date()
        date.setHours(h, m, 0, 0)
        return date
      })
      newGame.startTime = startTime
      newGame.endTime = endTime
    }
    return newGame
  })
}

export default function App() {
  const [games, setGames] = useState([])

  const gamesParser = new PublicGoogleSheetsParser(SHEET_ID, {
    sheetName: GAMES_SHEET_NAME,
  })
  useEffect(() => {
    const interval = setInterval(() => {
      gamesParser.parse().then(data => {
        setGames(transformGamesData(data))
      })
    }, 7500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex h-dvh gap-3 p-6">
      <div className="flex flex-col gap-3">
        <Field games={games} index={1} />
        <Field games={games} index={1} />
        <Time className="mt-auto" />
      </div>
    </div>
  )
}
