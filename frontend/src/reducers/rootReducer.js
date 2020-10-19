function rootReducer(state={
  player: null,
  lobby: null,
  joiningLobby: false,
  creatingPlayer: false,
  lobbyJoined: false,
  lobbyCode: null,
  playerCreated: false,
  playerId: null,
  errors: []
}, action){

  switch(action.type){

    case("START_JOIN_LOBBY"):
      return {
        ...state,
        joiningLobby: true,
        errors: []
      }
    case("START_CREATE_PLAYER"):
      return {
        ...state,
        creatingPlayer: true,
        errors: []
      }
    case("JOIN_LOBBY"):
      return {
        ...state,
        joiningLobby: false,
        lobbyJoined: true,
        lobbyCode: action.code,
        errors: []
      }
    case("CREATE_PLAYER"):
      return {
        ...state,
        creatingPlayer: false,
        playerCreated: true,
        playerId: action.id,
        errors: []
      }
    case("FAILED_JOIN_LOBBY"):
      return {
        ...state,
        joiningLobby: false,
        playerCreated: false,
        playerId: null,
        errors: [action.error]
      }
    case("FAILED_CREATE_PLAYER"):
      return {
        ...state,
        creatingPlayer: false,
        lobbyJoined: false,
        lobbyCode: null,
        errors: [action.error]
      }
    case("SET_LOBBY"):
      return {
        ...state,
        joiningLobby: false,
        lobbyJoined: true,
        lobby: action.lobby,
        lobbyCode: action.lobby.code,
        errors: []
      }
    
    case("LEAVE_LOBBY"):
      return {
        ...state,
        player: null,
        lobby: null,
        lobbyJoined: false,
        lobbyCode: null,
        errors: []
      }
    
    case("UPDATE_PLAYERS"):
      return {
        ...state,
        player: {...state.player},
        lobby: {
          ...state.lobby, 
          players: action.players
        },
        errors: []
      }

    default:
      return state
  }
}

export default rootReducer