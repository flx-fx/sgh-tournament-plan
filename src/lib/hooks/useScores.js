import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import { useEffect, useState } from 'react'

export const scoreParser = new PublicGoogleSheetsParser(import.meta.env.VITE_SHEET_ID, {
  sheetName: import.meta.env.VITE_SCORES_SHEET_NAME,
})

export function useScores() {
  const [scores, setScores] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      scoreParser.parse().then(data => {
        setScores(data)
      })
    }, 7500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return scores
}
