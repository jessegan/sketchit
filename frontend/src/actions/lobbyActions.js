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
      body: JSON.stringify({ name: name })
    }

    fetch(`${BASEURL}/lobbies/${code}/join`,config)
      .then(resp => resp.json())
      .then(data => { console.log(data)
        dispatch({
          type: "JOIN_LOBBY",
          ...data
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