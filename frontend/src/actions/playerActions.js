const BASEURL = "http://localhost:8000"

export const updatePlayers = (players) => {
  return {type: "UPDATE_PLAYERS", players}
}