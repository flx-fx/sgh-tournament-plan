export function useNextGames(games, now) {
  const currentGames = games.filter(game => {
    return now >= game.startTime && now <= game.endTime
  })
  const cGame = currentGames.length > 0 ? currentGames[0] : undefined
  const n1Game = getNextGame(games, cGame, now)
  const n2Game = getNextGame(games, n1Game, now)

  return { cGame, n1Game, n2Game }
}

function getNextGame(games, currentGame, now) {
  if (!games) return undefined
  return games.find(it => (currentGame ? it.startTime > currentGame.startTime : it.startTime > now))
}
