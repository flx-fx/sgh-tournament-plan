export function useNextGames(games, now) {
  const gamesSorted = games.toSorted((a, b) => a.startTime - b.startTime)
  const currentGames = gamesSorted.filter(game => {
    return now >= game.startTime && now <= game.endTime
  })
  const cGame = currentGames.length > 0 ? currentGames[0] : undefined
  const n1Game = getNextGame(gamesSorted, cGame, now)
  const n2Game = getNextGame(gamesSorted, n1Game, now)

  return { cGame, n1Game, n2Game }
}

function getNextGame(games, currentGame, now) {
  if (!games) return undefined
  return games.find(it => (currentGame ? it.startTime > currentGame.startTime : it.startTime > now))
}
