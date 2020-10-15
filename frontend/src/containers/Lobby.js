import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updatePlayers, fetchLobby } from '../actions/lobbyActions'

export class Lobby extends Component {

  componentDidMount(){
    
    this.props.fetchLobby(this.props.lobbyCode)

    this.props.cableApp.lobby = this.props.cableApp.cable.subscriptions.create({
      channel: "LobbyChannel",
      code: this.props.lobbyCode
    },
    {
      received: ({ players }) => this.props.updatePlayers(players)
    })
  }

  genPlayers = () => {
    return this.props.lobby.players.map( (p,i) => {
      return <h3 key={i}>{p.name}</h3>
    })
  }

  render() {
    if(this.props.lobby === null){
      return (<div>Loading...</div>)
    }
    return (
      <div>
        { this.props.lobby.code }
        { this.genPlayers() }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    lobby: state.lobby,
    lobbyCode: state.lobbyCode
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchLobby: (lobbyCode) => dispatch(fetchLobby(lobbyCode)),
    updatePlayers: (players) => dispatch(updatePlayers(players))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lobby)
