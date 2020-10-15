function rootReducer(state={
  player: null,
  lobby: null,
  joining: false,
  lobbyJoined: false,
  lobbyCode: null
}, action){

  switch(action.type){

    case("START_JOIN_LOBBY"):
      return {
        ...state,
        joining: true
      }
    case("JOIN_LOBBY"):
      return {
        ...state,
        player: {...action.player},
        joining: false,
        lobbyJoined: true,
        lobbyCode: action.lobbyCode
      }
    case("FAILED_JOIN_LOBBY"):
      return {
        ...state,
        joining: false
      }

    case("SET_LOBBY"):
      return {
        ...state,
        player: {...state.player},
        lobby: action.lobby
      }
    
    case("UPDATE_PLAYERS"):
      return {
        ...state,
        player: {...state.player},
        lobby: {
          ...state.lobby, 
          players: action.players
        }
      }

    default:
      return state
  }
}

export default rootReducer