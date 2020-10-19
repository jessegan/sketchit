import React, { Component } from 'react'
import { connect } from 'react-redux'

import PlayersList from '../components/PlayersList'
import { leaveLobby } from '../actions/lobbyActions'
import { CanvasContainer } from './CanvasContainer'

export class Lobby extends Component {

  /**
   * Handles players closing window or refreshing by calling leaveLobby action
   * @param {*} e 
   */
  onUnload = e => {
    e.preventDefault()
    this.props.leaveLobby(this.props.playerId)
  }

  componentDidMount(){
    window.addEventListener("beforeunload", this.onUnload)
  }

  componentWillUnmount(){
    window.addEventListener("beforeunload", this.onUnload)
  }

  render() {
    return (
      <div>
        { this.props.lobby.code }
        <PlayersList players={ this.props.lobby.players } />
        <CanvasContainer lobbyCode={ this.props.lobby.code } />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lobby: state.lobby,
    playerId: state.playerId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    leaveLobby: (playerId) => dispatch( leaveLobby(playerId) )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lobby)
