export const joinLobby = () => {
  return (dispatch) => {
    dispatch({type: "START_JOIN_LOBBY"})
  }
}