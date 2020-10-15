import React, { Component } from 'react'
import { connect } from 'react-redux'

import PlayersList from '../components/PlayersList'

import { fetchLobby, leaveLobby } from '../actions/lobbyActions'
import { updatePlayers } from '../actions/playerActions'

export class Lobby extends Component {

  onUnload = e => {
    e.preventDefault()
    this.props.leaveLobby(this.props.player.id)
  }

  componentDidMount(){
    
    this.props.fetchLobby(this.props.lobbyCode)

    this.props.cableApp.lobby = this.props.cableApp.cable.subscriptions.create({
      channel: "PlayersChannel",
      code: this.props.lobbyCode
    },
    {
      received: ({ players }) => this.props.updatePlayers(players)
    })

    window.addEventListener("beforeunload", this.onUnload)
  }

  componentWillUnmount(){
    window.addEventListener("beforeunload", this.onUnload)
  }

  render() {
    if(this.props.lobby === null){
      return (<div>Loading...</div>)
    }
    return (
      <div>
        { this.props.lobby.code }
        <PlayersList players={ this.props.lobby.players } />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    player: state.player,
    lobby: state.lobby,
    lobbyCode: state.lobbyCode
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchLobby: (lobbyCode) => dispatch(fetchLobby(lobbyCode)),
    leaveLobby: (playerId) => dispatch(leaveLobby(playerId)),
    updatePlayers: (players) => dispatch(updatePlayers(players))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lobby)
