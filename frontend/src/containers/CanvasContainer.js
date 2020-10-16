import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CableApp } from '../index'

import Canvas from '../components/Canvas'

export class CanvasContainer extends Component {

  componentDidMount(){
    // Subscribe to canvas channel
    CableApp.canvas = CableApp.cable.subscriptions.create({
      channel: "CanvasChannel",
      lobby_code: this.props.lobbyCode
    })

  }

  render() {
    return (
      <div>
        <Canvas />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    lobbyCode: state.lobbyCode
  }
}

export default connect(mapStateToProps)(CanvasContainer)
