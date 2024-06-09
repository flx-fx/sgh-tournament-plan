import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import { useEffect, useState } from 'react'

export const scoreParser = new PublicGoogleSheetsParser(import.meta.env.VITE_SHEET_ID, {
  sheetName: import.meta.env.VITE_SCORES_SHEET_NAME,
})

export function useScores() {
  const [scores, setScores] = useState([])

  const fetchData = () => {
    scoreParser.parse().then(data => {
      setScores(data)
    })
  }

  useEffect(() => {
    fetchData() // Fetch data immediately on component mount
    const interval = setInterval(fetchData, 7500) // Then fetch data every 7.5 seconds
    return () => {
      clearInterval(interval)
    }
  }, [])

  return scores
}
