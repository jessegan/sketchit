import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CableApp } from '../index'

import Lobby from './Lobby'

import { fetchLobby, leaveLobby } from '../actions/lobbyActions'
import { updatePlayers } from '../actions/playerActions'
import CreatePlayerFormContainer from './CreatePlayerFormContainer'

export class LobbyContainer extends Component {

  /**
   * componentDidMount lifecycle
   * 
   * Fetches lobby, creates consumer and subscribes to PlayersChannel for given lobby, adds beforeunload event listener
   */
  componentDidMount(){
    this.props.fetchLobby(this.props.match.params.code)
      .then(() => {
        if(!this.props.lobbyJoined){
          this.props.history.push("/")
        }
      })

    CableApp.players = CableApp.cable.subscriptions.create({
      channel: "PlayersChannel",
      code: this.props.match.params.code
    },
    {
      received: ({ players }) => this.props.updatePlayers(players)
    })
  }

  /**
   * componentWillUnmount lifecycle
   * 
   * removes beforeunload event listener
   */
  componentWillUnmount(){
    CableApp.players.unsubscribe()
  }

  render() {
    if(this.props.lobby === null){
      return (<div>Loading...</div>)
    }
    return (
      <>
        { this.props.playerCreated ? <Lobby /> : <CreatePlayerFormContainer /> }
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    lobby: state.lobby,
    joiningLobby: state.joiningLobby,
    lobbyJoined: state.lobbyJoined,
    playerCreated: state.playerCreated
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchLobby: (lobbyCode) => dispatch(fetchLobby(lobbyCode)),
    leaveLobby: (playerId) => dispatch(leaveLobby(playerId)),
    updatePlayers: (players) => dispatch(updatePlayers(players))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LobbyContainer)
