const BASEURL = "http://localhost:8000"

export const updatePlayers = (players) => {
  return {type: "UPDATE_PLAYERS", players}
}

export const createPlayer = (playerData) => {
  return ( dispatch => {
    dispatch({ type: "START_CREATE_PLAYER" })

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...playerData })
    }
  
    fetch(`${BASEURL}/players`,config)
      .then(response => {
        if(response.ok){
          return response.json()
        }
      })
      .then(data => {
        dispatch({
          type: "CREATE_PLAYER",
          ...data
        })
      })
  })
}