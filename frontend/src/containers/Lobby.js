import React, { Component } from 'react'
import { connect } from 'react-redux'

import PlayersList from '../components/PlayersList'
import { leaveLobby } from '../actions/lobbyActions'
import { CanvasContainer } from './CanvasContainer'

import Button from 'react-bootstrap/Button'

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

  copyLink = () => {
    const el = document.createElement('textarea')
    el.value = `localhost:3000/${this.props.lobby.code}`
    document.body.appendChild(el)
    el.select() 
    document.execCommand("copy")
    document.body.removeChild(el)
  }

  render() {
    return (
      <div>
        <h3>{ this.props.lobby.code }</h3>
        <Button variant="outline-secondary" size="sm" onClick={this.copyLink} style={{margin: "10px"}}>Copy Lobby Link</Button>

        <CanvasContainer lobbyCode={ this.props.lobby.code } />
        <PlayersList players={ this.props.lobby.players } />
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
