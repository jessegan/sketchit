import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Lobby extends Component {
  render() {
    return (
      <div>
        { this.props.lobby.code }
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
