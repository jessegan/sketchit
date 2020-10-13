import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Lobby extends Component {

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

export default connect(mapStateToProps)(Lobby)
