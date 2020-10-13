function rootReducer(state={
  player: {},
  lobby: {},
  joining: false
}, action){

  switch(action.type){

    case("START_JOIN_LOBBY"):
      return {
        player: {},
        lobby: {},
        joining: true
      }
    case("JOIN_LOBBY"):
      return {
        player: {...action.player},
        lobby: {...action.lobby},
        joining: false
      }
    case("FAILED_JOIN_LOBBY"):
      return {
        player: {},
        lobby: {},
        joining: false
      }

    default:
      return state
  }
}

export default rootReducer