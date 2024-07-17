import { useEffect, useState } from 'react'
import PublicGoogleSheetsParser from 'public-google-sheets-parser'

const gamesParser = new PublicGoogleSheetsParser(import.meta.env.VITE_SHEET_ID, {
  sheetName: import.meta.env.VITE_GAMES_SHEET_NAME,
})

function transformGamesData(data) {
  return data.map(game => {
    let newGame = game
    newGame.fieldName = game.field
    game.field === 'Kunstrasen' ? newGame.field = 1 : newGame.field = 2
    const [startTime, endTime] = [game.start_time, game.end_time].map(time => {
      const [h, m] = time.split(':').map(it => parseInt(it))
      const date = new Date()
      date.setHours(h, m, 0, 0)
      return date
    })
    newGame.startTime = startTime
    newGame.endTime = endTime
    return newGame
  })
}

export function useGames() {
  const [games, setGames] = useState([])

  const fetchData = () => {
    gamesParser.parse().then(data => {
      if (data) setGames(transformGamesData(data))
    })
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 7500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return games
}
