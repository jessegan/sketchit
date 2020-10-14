import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updatePlayers } from '../actions/lobbyActions'

export class Lobby extends Component {

  componentDidMount(){
    this.props.cableApp.lobby = this.props.cableApp.cable.subscriptions.create({
      channel: "LobbyChannel",
      code: this.props.lobby.code
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
    lobby: state.lobby
  }
}

function mapDispatchToProps(dispatch){
  return {
    updatePlayers: (players) => dispatch(updatePlayers(players))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lobby)
