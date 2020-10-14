function rootReducer(state={
  player: null,
  lobby: null,
  joining: false,
  lobbyJoined: false
}, action){

  switch(action.type){

    case("START_JOIN_LOBBY"):
      return {
        ...state,
        joining: true
      }
    case("JOIN_LOBBY"):
      return {
        player: {...action.player},
        lobby: {...action.lobby},
        joining: false,
        lobbyJoined: true
      }
    case("FAILED_JOIN_LOBBY"):
      return {
        ...state,
        joining: false
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