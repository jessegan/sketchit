import { createPlayer } from './playerActions'

const BASEURL = "http://localhost:8000"

/**
 * Sets lobbyCode and then dispatches createPlayer action
 * 
 * @param {Object} playerData 
 */
export const joinLobbyFromForm = ( playerData ) => {
  return (dispatch) => {
    dispatch({
      type: "JOIN_LOBBY",
      code: playerData.code
    })
    dispatch( createPlayer(playerData) )
  }
}

/**
 * Dispatches redux actions to handle creating lobby from form. 
 * Function will dispatch START_JOIN_LOBBY, then perform POST request to create new Lobby,
 *  then dispatch createPlayer action with data from request.
 * 
 * @param {Object} param0 payload with keys { lobbyData, and playerData} 
 */
export const createLobbyFromForm = ( { lobbyData, playerData } ) => {
  return (dispatch) => {
    dispatch({type: "START_JOIN_LOBBY"})

    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify( lobbyData )
    }

    fetch(`${BASEURL}/lobbies`,config)
      .then(resp=>resp.json())
      .then(data=> {
        dispatch({
          type: "JOIN_LOBBY",
          ...data
        })

        dispatch( createPlayer({ ...playerData, code: data.code}) )
      })
  }
}

/**
 * GET request to fetch Lobby with given code
 * 
 * @param {String} lobbyCode 
 */
export const fetchLobby = (lobbyCode) => {
  return (dispatch) => {
    dispatch({type: "START_JOIN_LOBBY"})

    return fetch(`http://localhost:8000/lobbies/${lobbyCode}`)
      .then(resp=> resp.json())
      .then(data=> {
        if(data.status === 400){
          throw new Error(data.message)
        } else {
          dispatch({type: "SET_LOBBY", lobby: data })}
        }
      )
      .catch(error => {
        dispatch({
          type: "FAILED_JOIN_LOBBY",
          error: error.message
        })
      })
  }
}

/**
 * DELETE request to delete player and delete lobby if empty
 * 
 * @param {Integer} playerId 
 */
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