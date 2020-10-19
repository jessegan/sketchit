const BASEURL = "http://localhost:8000"

export const joinLobby = ({ name,code }) => {
  return (dispatch) => {
    dispatch({type: "START_JOIN_LOBBY"})

    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({name,code})
    }

    fetch(`${BASEURL}/players`,config)
      .then(resp => {
        if(resp.ok){
          return resp.json()
        } else{
          throw new Error("LOBBY NOT FOUND")
        }
      })
      .then(data => {
        if(data.status !== 400){
          dispatch({
            type: "JOIN_LOBBY",
            ...data
          })
        }
      })
      .catch(error => {
        dispatch({
          type: "FAILED_JOIN_LOBBY",
          error: error.message
        })
      })
  }
}

export const createLobby = ({ name }) => {
  return (dispatch) => {
    dispatch({type: "START_JOIN_LOBBY"})

    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify( { name } )
    }

    fetch(`${BASEURL}/lobbies`,config)
      .then(resp=>resp.json())
      .then(data=> {
        dispatch({
          type: "JOIN_LOBBY",
          ...data
        })
      })
  }
}

export const fetchLobby = (lobbyCode) => {
  return (dispatch) => {
    fetch(`http://localhost:8000/lobbies/${lobbyCode}`)
      .then(resp=>resp.json())
      .then(lobby=> {
        dispatch({type: "SET_LOBBY", lobby})})
  }
}

export const leaveLobby = (playerId) => {
  return (dispatch) => {
    let config = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true
    }

    fetch(`${BASEURL}/players/${playerId}`,config)
      .then(resp=>resp.json())
      .then(data=>{
        dispatch({type: "LEAVE_LOBBY"})
      })
  }
}