export function useNextGames(games, now) {
  const gamesSorted = games.toSorted((a, b) => a.startTime - b.startTime)
  const cGames = gamesSorted.filter(game => {
    return now >= game.startTime && now <= game.endTime
  })
  const cGame = cGames.length > 0 ? cGames[0] : undefined
  const n1Game = getNextGame(gamesSorted, cGame, now)
  const n2Game = getNextGame(gamesSorted, n1Game, now)

  return { cGames, cGame, n1Game, n2Game }
}

function getNextGame(games, currentGame, now) {
  if (!games) return undefined
  return games.find(it => (currentGame ? it.startTime > currentGame.startTime : it.startTime > now))
}
