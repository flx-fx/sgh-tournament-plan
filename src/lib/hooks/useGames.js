import { useEffect, useState } from 'react'
import PublicGoogleSheetsParser from 'public-google-sheets-parser'

const gamesParser = new PublicGoogleSheetsParser(import.meta.env.VITE_SHEET_ID, {
  sheetName: import.meta.env.VITE_GAMES_SHEET_NAME,
})

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

export function useGames() {
  const [games, setGames] = useState([])

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

  return games
}
