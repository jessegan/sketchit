import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CableApp } from '../index'
import { Redirect } from 'react-router-dom'

import PlayersList from '../components/PlayersList'
import Game from './Game'

import { fetchLobby, leaveLobby } from '../actions/lobbyActions'
import { updatePlayers } from '../actions/playerActions'

export class Lobby extends Component {

  /**
   * Handles players closing window or refreshing by calling leaveLobby action
   * @param {*} e 
   */
  onUnload = e => {
    e.preventDefault()
    this.props.leaveLobby(this.props.player.id)
  }

  /**
   * componentDidMount lifecycle
   * 
   * Fetches lobby, creates consumer and subscribes to PlayersChannel for given lobby, adds beforeunload event listener
   */
  componentDidMount(){
    
    this.props.fetchLobby(this.props.lobbyCode)

    CableApp.players = CableApp.cable.subscriptions.create({
      channel: "PlayersChannel",
      code: this.props.lobbyCode
    },
    {
      received: ({ players }) => this.props.updatePlayers(players)
    })

    window.addEventListener("beforeunload", this.onUnload)
  }

  /**
   * componentWillUnmount lifecycle
   * 
   * removes beforeunload event listener
   */
  componentWillUnmount(){
    window.addEventListener("beforeunload", this.onUnload)
    CableApp.players.unsubscribe()
  }

  render() {
    if(this.props.player === null){
      return (<Redirect to="/" />)
    }

    if(this.props.lobby === null){
      return (<div>Loading...</div>)
    }
    return (
      <div>
        { this.props.lobby.code }
        <PlayersList players={ this.props.lobby.players } />
        <Game />
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
