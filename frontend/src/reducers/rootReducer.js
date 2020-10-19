function rootReducer(state={
  player: null,
  lobby: null,
  joining: false,
  lobbyJoined: false,
  lobbyCode: null,
  errors: []
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
        joining: false,
        errors: [action.error]
      }

    case("SET_LOBBY"):
      return {
        ...state,
        player: {...state.player},
        lobby: action.lobby
      }
    
    case("LEAVE_LOBBY"):
      return {
        ...state,
        player: null,
        lobby: null,
        lobbyJoined: false,
        lobbyCode: null
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